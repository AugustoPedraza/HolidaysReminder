class NotificationMailer < ActionMailer::Base
  default from: "myholidaysreminder@gmail.com"

  def holiday_is_coming(user, holiday, client)
    @client  = client
    @holiday = holiday
    @user    = user

    mail(to: @client.email, subject: "Holiday is coming")
  end
end
