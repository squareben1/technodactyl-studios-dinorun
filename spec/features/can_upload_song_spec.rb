require 'rails_helper'

feature 'user can upload song', js: true do
  scenario ' user clicks choose file and upload song', driver: :selenium_chrome_headless do
    visit '/'
    attach_file("song[mp3]", Rails.root + "spec/fixtures/test_music.mp3")
    click_button "Create Song"
    attach_file("song[mp3]", Rails.root + "spec/fixtures/test_music.mp3")
    click_button "Create Song"
    find('#song_selection').find(:xpath, 'option[3]').select_option
    expect(page).to have_content "test_music.mp3"
  end
end
