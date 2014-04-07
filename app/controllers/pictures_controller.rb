class PicturesController < ApplicationController
  def new
  @picture = Picture.new
  end

  def create
  puts "aaaaaaaaaaaaaaaaaaaaaaaaaa",params.inspect
  #puts "aaaaaaaaaaaaaaaaaaaaaaaaaa",@content_type.inspect
  #puts "aaaaaaaaaaaaaaaaaaaaaaaaaa",params[:picture][:attach][:pic_content_type].inspect
  #puts "aaaaaaaaaaaaaaaaaaaaaaaaaa",params[:picture][:attach][:pic_file_size].inspect
  if params[:picture].present?
  @picture = Picture.new(pic_params)
  @picture.save
    redirect_to pictures_path
  else
    redirect_to :controller => "pictures", :action => 'new'
    end

  end
  def show
    @picture = Picture.find(params[:id])
    puts "bbbbbbbbbbbbbbbbbbbbbbbb",@picture.inspect


  end
  def index
  @pictures = Picture.all
  end




end
private
def pic_params
  params[:picture].permit(:pic)# (:pic_file_name,:pic_content_type,:pic_file_size)
end

