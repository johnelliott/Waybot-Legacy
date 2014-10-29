require 'test_helper'

class RunsControllerTest < ActionController::TestCase
  setup do
    @user = FactoryGirl.create :user
    @run = Run.create!()
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:runs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create run" do
    assert_difference('Run.count') do
      post :create, run: { completed: @run.completed, end_time: @run.end_time, name: @run.name, note: @run.note, start_time: @run.start_time, user_id: @run.user_id }
    end

    assert_redirected_to run_path(assigns(:run))
  end

  test "should show run" do
    get :show, id: @run
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @run
    assert_response :success
  end

  test "should update run" do
    patch :update, id: @run, run: { completed: @run.completed, end_time: @run.end_time, name: @run.name, note: @run.note, start_time: @run.start_time, user_id: @run.user_id }
    assert_redirected_to run_path(assigns(:run))
  end

  test "should destroy run" do
    assert_difference('Run.count', -1) do
      delete :destroy, id: @run
    end

    assert_redirected_to runs_path
  end
end
