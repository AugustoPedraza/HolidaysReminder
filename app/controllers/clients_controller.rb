class ClientsController < ApplicationController
  # GET /clients
  # GET /clients.json
  def index
    @clients = Client.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @clients }      
    end
  end

  # GET /clients/1
  # GET /clients/1.json
  def show
    @client = Client.find(params[:id])

    respond_to do |format|
      format.js{ render layout: false }
    end
  end

  # GET /clients/new
  # GET /clients/new.json
  def new
    @client = Client.new

    respond_to do |format|
      format.js{ render layout: false }
    end
  end

  # GET /clients/1/edit
  def edit
    @client = Client.find(params[:id])

    respond_to do |format|
      format.js{ render :layout=>false }
    end    
  end  

  # POST /clients
  # POST /clients.json
  def create
    @client = Client.new(params[:client])

    respond_to do |format|
      # if @client.save
      #   format.html { redirect_to @client, notice: 'Client was successfully created.' }
      #   format.json { render json: @client, status: :created, location: @client }
      # else
      #   format.html { render action: "new" }
      #   format.json { render json: @client.errors, status: :unprocessable_entity }
      # end
      if @client.save
        format.js{ render layout: false, action: :success }
      else
        format.js{ render layout: false, action: :failure }
      end
    end
  end

  # PUT /clients/1
  # PUT /clients/1.json
  def update
    @client = Client.find(params[:id])

    respond_to do |format|
      if @client.update_attributes(params[:client])
        # format.html { redirect_to @client, notice: 'Client was successfully updated.' }
        # format.json { head :no_content }
        format.js{ render layout: false, action: :success }
      else
        format.js{ render layout: false, action: :failure }
        # format.html { render action: "edit" }
        # format.json { render json: @client.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /clients/1
  # DELETE /clients/1.json
  def destroy
    @client = Client.find(params[:id])
    @client.destroy

    #TODO: control de errores.

    respond_to do |format|
      format.js{ render layout: false }
    end
  end
end