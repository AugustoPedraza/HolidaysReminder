puts 'SETTING UP DEFAULT USER LOGIN'

user = User.create! name: 'First User', email: 'user@example.com', password: 'please', password_confirmation: 'please',  confirmed_at: Date.new

puts 'New user created: ' << user.name

user2 = User.create! name: 'Second User', email: 'user2@example.com', password: 'please', password_confirmation: 'please', confirmed_at: Date.new

puts 'New user created: ' << user2.name