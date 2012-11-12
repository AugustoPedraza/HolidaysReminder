class HolidaysController < ApplicationController
  # GET /holidays
  # GET /holidays.json
  def index
    @holidays = Holiday.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @holidays.map{|h| {title: h.name, start: h.date, end: h.date, id: h.id} } }
    end
  end

  # GET /holidays/1
  # GET /holidays/1.json
  def show
    @holiday = Holiday.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @holiday }
    end
  end

  # POST /holidays
  # POST /holidays.json
  def create
    params[:holiday][:date] = DateTime.strptime(params[:holiday][:date],'%d/%m/%Y')
    @holiday = Holiday.new(params[:holiday])

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
    @holiday = Holiday.find(params[:id])

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
    @holiday = Holiday.find(params[:id])
    @holiday.destroy

    respond_to do |format|
      format.html { redirect_to holidays_url }
      format.json { head :no_content }
    end
  end
end
