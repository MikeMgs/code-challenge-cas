class Video < ApplicationRecord
  include Rails.application.routes.url_helpers

  belongs_to :category
  has_one_attached :clip
  has_many_attached :thubnails

  after_create :thubnails_job

  validates :clip, presence: true
  validate :validate_video_format, :validate_video_size

  THUBNAIL_SIZES = [64, 128, 256].freeze
  private_constant :THUBNAIL_SIZES

  MAX_FILE_SIZE = 200.megabyte.freeze
  private_constant :MAX_FILE_SIZE

  def link
    rails_blob_path(clip, only_path: true)
  end

  def create_thubnails
    movie = FFMPEG::Movie.new(ActiveStorage::Blob.service.path_for(clip.key))
    THUBNAIL_SIZES.each do |size|
      ss = movie.screenshot("screenshot.jpg", resolution: "#{size}x#{size}")
      self.thubnails.attach(io: File.open(ss.path), filename: "#{name}-#{size}x#{size}", content_type: 'image/jpg')
    end
  end

  private

  def thubnails_job
    ThubnailsCreationJob.perform_later(self)
  end

  def validate_video_size
    if clip.byte_size  > MAX_FILE_SIZE
      errors.add(:clip, "The file must be maximum 200mb")
    end
  end

  def validate_video_format
    unless ['video/mp4','video/quicktime'].include?(clip.content_type)
      errors.add(:clip, "The file must be mp4 or mov")
    end
  end
end
