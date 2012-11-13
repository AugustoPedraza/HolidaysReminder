class HomeController < ApplicationController
  def index
    render action: "index", layout: 'home'
  end
end
