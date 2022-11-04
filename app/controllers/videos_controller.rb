class VideosController < ApplicationController
  skip_before_action :verify_authenticity_token
  FFMPEG.ffmpeg_binary = '/usr/bin/ffmpeg'

  def index
    videos = Video.all

    render json: videos, root: 'data', each_serializer:VideoSerializer
  end

  def create
    @video = Video.new(video_params)

    if @video.save
      render status: 200, json: { message: 'Upload Successful' }
    else
      render status: 400, json: { message: 'Upload Failed', errors: @video.errors.full_messages.to_sentence }
    end
  end

  private

  def video_params
    params.permit(:name, :category_id, :clip)
  end
end
