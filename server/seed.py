#!/usr/bin/env python3

from app import app
from models import db, Charity, Volunteer, Post, Comment

with app.app_context():
    
    Charity.query.delete()
    Volunteer.query.delete()
    Post.query.delete()
    Comment.query.delete()

    charities = []
    charities.append(Charity(name="Deliver Meals to Homebound Residents", location="Lower East Side, Manhattan", date="Tuesday, July 11", time="9:00 AM - 11:00 AM", description="Bring meals and a smile to homebound seniors and adults in NYCHA housing on this physically engaging project. Be a friendly face for those most vulnerable to social isolation. You'll be on your feet most of the time, so cancel your gym plans!"))
    charities.append(Charity(name="Deliver Lunch To Seniors", location="Upper West Side, Manhattan", date="Tuesday, July 11", time="10:00 AM - 12:30 AM", description="Deliver lunch to senior residents living in Midtown and on the Upper West Side, helping them stay independent in their own homes. All delivery routes will be done on foot!"))
    charities.append(Charity(name="Roll Up Your Sleeves", location="Greenwich Village, Manhattan", date="Tuesday, July 11", time="10:00 AM - 12:30 PM", description="Bring in delivered groceries and help set up and organize the pantry. This project requires heavy lifting (30-40 lbs.), and you'll be on your feet the whole time."))

    volunteers = []
    volunteers.append(Volunteer(username="bellagerken", password_hash="bellas_password"))
    volunteers.append(Volunteer(username="marikagerken", password_hash="marikas_password"))
    volunteers.append(Volunteer(username="annikagerken", password_hash="annikas_password"))

    posts = []
    posts.append(Post(image="https://media.tpt.cloud/nextavenue/uploads/2017/06/5-Benefits-of-Home-Delivered-Meals.jpg", caption="Bringing smiles and nourishment to those in need! Proud to have volunteered today delivering meals to homebound residents. Making a difference, one plate at a time.", likes=0, volunteer_id=3))
    posts.append(Post(image="https://companionsforseniors.com/wp-content/uploads/2021/02/2020-2-1-Online-Food-Delivery-Programs-for-Seniors-GrubHub-DoorDash-Instacart.jpg", caption="Spreading love and warmth one meal at a time! Had an incredible experience volunteering today, delivering delicious lunches to seniors in our community. Seeing their smiles and hearing their stories made my day.", likes=0, volunteer_id=1))
    posts.append(Post(image="https://wordpress.wbur.org/wp-content/uploads/2020/06/IMG_2127-1000x750.jpeg", caption="Making sure everyone has access to essential groceries and a well-stocked pantry! Had an amazing time volunteering today, bringing in groceries and organizing the pantry shelves. Together, we're fighting hunger and ensuring no one goes without.", likes=0, volunteer_id=2))

    comments = []
    comments.append(Comment(comment_post="That's awesome!!!!", post_id=1, volunteer_id=2))
    comments.append(Comment(comment_post="Inspiring.", post_id=2, volunteer_id=3))
    comments.append(Comment(comment_post="I want to volunteer with you next time!", post_id=3, volunteer_id=1))

    db.session.add_all(charities)
    db.session.add_all(volunteers)
    db.session.add_all(posts)
    db.session.add_all(comments)
    db.session.commit()
    print("🌱 Charities, Volunteers, Posts, and Comments successfully seeded! 🌱")
