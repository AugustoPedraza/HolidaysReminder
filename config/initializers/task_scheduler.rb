scheduler = Rufus::Scheduler.start_new

scheduler.every("1m") do
  User.all.each do |user|
    User.find(user.id).holidays.each do |holiday|
      User.find(user.id).clients.each do |client|
          puts "Agregando notificacion..."
          NotificationMailer.holiday_is_coming(user, holiday, client).deliver
      end
    end
  end
end 