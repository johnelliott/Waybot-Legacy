json.array!(@runs) do |run|
  json.extract! run, :id, :user_id, :name, :note, :start_time, :end_time, :completed
  json.url run_url(run, format: :json)
end
