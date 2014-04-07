class PostsController < ApplicationController

  before_action :authenticate_user!

  def new
  @post = Post.new
  end

  def create
    puts "1111111111111111",params.inspect
    @post = Post.new(posts_params)
   if @post.save
     flash[:success] = "Post SuccessFully Created"
    redirect_to post_path(@post)
   else
     render "new"
  end
  end

  def show
   if current_user
   @post = Post.find(params[:id])
   end

  end

  def index
  @posts = current_user.posts
  end

  def edit
  @post = Post.find(params[:id])
  end

  def update
  @post = Post.find(params[:id])
    if @post.update_attributes(params[:post].permit(:title, :text,:user_id))
      redirect_to @post
    else
      render 'edit'
    end
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.destroy
      redirect_to posts_path
    end
  end
end

private

def posts_params
  params[:post].permit(:title, :text,:user_id)

end