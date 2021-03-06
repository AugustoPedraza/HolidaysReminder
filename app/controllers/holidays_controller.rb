class HolidaysController < ApplicationController
  before_filter :authenticate_user!
  # GET /holidays
  # GET /holidays.json
  def index
    @holidays = User.find(current_user.id).holidays

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @holidays.map{|h| {title: h.name, start: h.date, end: h.date, id: h.id} } }
    end
  end

  # GET /holidays/1
  # GET /holidays/1.json
  def show
    @holiday = User.find(current_user.id).holidays.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @holiday }
    end
  end

  # POST /holidays
  # POST /holidays.json
  def create
    user   = User.find(current_user.id)
    params[:holiday][:date] = DateTime.strptime(params[:holiday][:date],'%d/%m/%Y')
    @holiday = user.holidays.create(params[:holiday])

    respond_to do |format|
      if @holiday.save
        format.json { render json: @holiday, status: :created, location: @holiday }
      else
        format.json { render json: @holiday.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /holidays/1
  # PUT /holidays/1.json
  def update
    params[:holiday][:date] = DateTime.strptime(params[:holiday][:date],'%d/%m/%Y')
    
    user     = User.find(current_user.id)
    @holiday = user.holidays.find(params[:id])

    respond_to do |format|
      if @holiday.update_attributes(params[:holiday])
        format.json { head :no_content }
      else
        format.json { render json: @holiday.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /holidays/1
  # DELETE /holidays/1.json
  def destroy
    user     = User.find(current_user.id)
    @holiday = user.holidays.find(params[:id])

    @holiday.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end
end
