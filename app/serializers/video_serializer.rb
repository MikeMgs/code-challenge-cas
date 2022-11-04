class VideoSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :name, :category_name, :link, :thubnail

  def category_name
    object.category.name
  end

  def link
    object.link
  end

  def thubnail
    image = object.thubnails&.second

    rails_blob_path(image, only_path: true) if image.present?
  end
end
