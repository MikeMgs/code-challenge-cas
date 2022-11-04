class ThubnailsCreationJob < ApplicationJob
  queue_as :default

  def perform(current_video)
    current_video.create_thubnails

    videos = Video.left_joins(:thubnails_attachments).
      where(active_storage_attachments: { id: nil })

    videos.each do |video|
      video.create_thubnails
    end
  end
end
