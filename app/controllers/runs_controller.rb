class RunsController < ApplicationController
  before_action :set_run, only: [:show, :edit, :update, :destroy]

  # GET /runs
  # GET /runs.json
  def index
    @runs = Run.all
  end

  # GET /runs/1
  # GET /runs/1.json
  def show
  end

  # GET /runs/new
  def new
    @run = Run.new
  end

  # GET /runs/1/edit
  def edit
  end

  # POST /runs
  # POST /runs.json
  def create
    # store json in a temporary object and send it to the hits controller to be stored
    if params[:json]
      @json_temp_data = set_json_temp_data(run_params)
    end
    @run = Run.new(run_params.except(:json))
    # TODO send a message to hits contoller, and make that controller
      # call Run.store_ run_params(@json_temp_data[:name, :this, :that])
    # TODO save the appropriate data from @json_temp_data into the new run, for which i'll probably use a new runs model method
      #hits
      Hit.store_hits(@json_temp_data[:hit_minutes])
    respond_to do |format|
      if @run.save
        format.html { redirect_to @run, notice: 'Run was successfully created.' }
        format.json { render :show, status: :created, location: @run }
      else
        format.html { render :new }
        format.json { render json: @run.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /runs/1
  # PATCH/PUT /runs/1.json
  def update
    respond_to do |format|
      if @run.update(run_params)
        format.html { redirect_to @run, notice: 'Run was successfully updated.' }
        format.json { render :show, status: :ok, location: @run }
      else
        format.html { render :edit }
        format.json { render json: @run.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /runs/1
  # DELETE /runs/1.json
  def destroy
    @run.destroy
    respond_to do |format|
      format.html { redirect_to runs_url, notice: 'Run was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_run
      @run = Run.find(params[:id])
    end

    def set_json_temp_data
      json_temp_data = params[:json] # is this even right?
      parsed_json = JSON.parse(json_temp_data, {symbolize_names => true})
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def run_params
      params.require(:run).permit(:user_id, :name, :note, :start_time, :end_time, :completed, :json)
    end
end
