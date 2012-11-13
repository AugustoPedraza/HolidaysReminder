class HomeController < ApplicationController
  def index
    render action: "index", layout: 'home'
  end

  def register
    render action: "register", layout: 'home'
  end

  def successful_registration
    render action: "successful_registration", layout: 'home'
  end

  def successful_confirmation
    render action: "successful_confirmation", layout: 'home'
  end
end
