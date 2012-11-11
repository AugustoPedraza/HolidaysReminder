class CalendaryController < ApplicationController

  def index
  end

  def holidays
    @events = [
      { title: 'Primero de mes',   start: Time.parse('1-11-2012'),  end: Time.parse('1-11-2012'),  id: 123},
      { title: 'Primera quincena', start: Time.parse('15-11-2012'), end: Time.parse('15-11-2012'), id:  666},
      { title: 'Navidad',          start: Time.parse('25-12-2012'), end: Time.parse('25-12-2012'), id:  456}]

    respond_to do |format|
      format.js  { render :json => @events }
    end
  end

end