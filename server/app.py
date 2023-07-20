# !/usr/bin/env python3

import ipdb

from flask import Flask, make_response, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from sqlalchemy.exc import IntegrityError

from models import db, Charity, Volunteer, Post, Comment

app = Flask(__name__)
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hotels.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

CORS(app)

bcrypt = Bcrypt(app)

api = Api(app)



class Charities(Resource):

    def get(self):

        charities = Charity.query.all()

        response_body = []

        for charity in charities:
            response_body.append(charity.to_dict())

        return make_response(jsonify(response_body), 200)

    def post(self):

        charities = Charity.query.all()

        try:
            json_data = request.get_json()
            new_charity = Charity(name=json_data.get('name'), location=json_data.get('location'), date=json_data.get('date'), time=json_data.get('time'), description=json_data.get('description'))
            db.session.add(new_charity)
            db.session.commit()

            response_body = new_charity.to_dict()
            
            return make_response(jsonify(response_body), 201)

        except ValueError:
            response_body = {
                "errors": ["validation errors"]
            }
            return make_response(jsonify(response_body), 400)


api.add_resource(Charities, '/charities')

class CharityById(Resource):

    def get(self, id):

        charity = Charity.query.filter(Charity.id == id).first()

        if not charity:
            response_body = {
                "error": "Charity not found"
            }
            return make_response(jsonify(response_body), 404)
        
        response_body = charity.to_dict()
        posts_list = []
        for post in charity.posts:
            post_dict = post.to_dict()
            post_dict.update({
                "volunteer": post.charity.to_dict()
            })
            posts_list.append(post_dict)
        response_body.update({
            "posts": posts_list
        })
        return make_response(jsonify(response_body), 200)

    def delete(self, id):

        charity = Charity.query.filter(Charity.id == id).first()

        if not charity:
            response_body = {
                "error": "Charity not found"
            }
            status = 404

        else:
            db.session.delete(charity)
            db.session.commit()

            response_body = {}
            status = 204

        return make_response(jsonify(response_body), status)
    
    def patch(self, id):

        charity = Charity.query.filter(Charity.id == id).first()

        if not charity:
            response_body = {
                "error": "Charity not found"
            }
            return make_response(jsonify(response_body), 404)

        try:
            json_data = request.get_json()
            for key in json_data:
                setattr(charity, key, json_data.get(key))
            db.session.commit()

            response_body = charity.to_dict()
            return make_response(jsonify(response_body), 200)
            
        except ValueError as error:
                
            response_body = {
                "error": error.args
            }
                
            return make_response(jsonify(response_body), 422)


api.add_resource(CharityById, '/charities/<int:id>')

class Posts(Resource):

    def get(self):

        posts = Post.query.all()

        response_body = []

        for post in posts:
            post_dict = post.to_dict()
            comments = []
            volunteers = []
            for comment in post.comments:
                comment_dict = comment.to_dict()
                comment_dict.update({
                    "volunteer": comment.volunteer.to_dict()
                })
                comments.append(comment_dict)
            post_dict.update({
                "comments": comments,
                "volunteer": post.volunteer.to_dict()
            })
            # for volunteer in post.volunteers:
            #     volunteers.append(volunteer.to_dict())
            # post_dict.update({
            #     "volunteers": volunteers
            # })
            response_body.append(post_dict)

        return make_response(jsonify(response_body), 200)
    
    def post(self):
        try:
            json_data = request.get_json()
            new_post = Post(image=request.get_json().get('image'), caption=request.get_json().get('caption'), likes=request.get_json().get('likes'), volunteer_id=request.get_json().get('volunteer_id'), charity_id=request.get_json().get('charity_id'))
            db.session.add(new_post)
            db.session.commit()

            response_body = new_post.to_dict()
            response_body.update({
                "volunteer": new_post.volunteer.to_dict(),
                "comments": []
            })
            
            return make_response(jsonify(response_body), 201)
        except ValueError:
            response_body = {
                "error": ["validation errors"]
            }
            return make_response(jsonify(response_body), 422)

api.add_resource(Posts, '/posts')


class PostById(Resource):
    
    def patch(self, id):

        post = Post.query.filter(Post.id == id).first()

        if not post:
            response_body = {
                "error": "Post not found"
            }
            return make_response(jsonify(response_body), 404)

        try:
            json_data = request.get_json()
            for key in json_data:
                setattr(post, key, json_data.get(key))
            db.session.commit()

            response_body = post.to_dict()
            comments = []
            for comment in post.comments:
                comment_dict = comment.to_dict()
                comment_dict.update({
                    "volunteer": comment.volunteer.to_dict()
                })
                comments.append(comment_dict)
            response_body.update({
                "comments": comments,
                "volunteer": post.volunteer.to_dict()
            })
            return make_response(jsonify(response_body), 200)
            
        except ValueError as error:
                
            response_body = {
                "error": error.args
            }
                
            return make_response(jsonify(response_body), 422)
    
    def delete(self, id):

        post = Post.query.filter(Post.id == id).first()

        if not post:
            response_body = {
                "error": "Charity not found"
            }
            status = 404

        else:
            db.session.delete(post)
            db.session.commit()

            response_body = {}
            status = 204

        return make_response(jsonify(response_body), status)


api.add_resource(PostById, '/posts/<int:id>')


class Comments(Resource):

    def get(self):

        comments = Comment.query.all()

        response_body = [comment.to_dict() for comment in comments]
        
        return make_response(jsonify(response_body), 200)
    
    def post(self):

        try:
            json_data = request.get_json()
            new_comment = Comment(comment_post=request.get_json().get('comment_post'), post_id=json_data.get('post_id'), volunteer_id=json_data.get('volunteer_id'))
            db.session.add(new_comment)
            db.session.commit()

            response_body = new_comment.to_dict()
            
            return make_response(jsonify(response_body), 201)

        except ValueError as error:
            response_body = {
                "error": error.args
            }
            return make_response(jsonify(response_body), 422)

api.add_resource(Comments, '/comments')

class CommentById(Resource):

    def delete(self, id):

        comment = Comment.query.filter(Comment.id == id).first()

        if not comment:
            response_body = {
                "error": "Comment not found"
            }
            status = 404

        else:
            db.session.delete(comment)
            db.session.commit()

            response_body = {}
            status = 204

        return make_response(jsonify(response_body), status)


api.add_resource(CommentById, '/comments/<int:id>')



class Volunteers(Resource):

    def get(self):

        volunteers = Volunteer.query.all()

        response_body = [volunteer.to_dict() for volunteer in volunteers]

        return make_response(jsonify(response_body), 200)

api.add_resource(Volunteers, '/volunteers')

def get_current_user():
    return Volunteer.query.where( Volunteer.id == session.get("volunteer_id") ).first()

def logged_in():
    return bool( get_current_user() )

# USER SIGNUP #

@app.post('/volunteers')
def create_user():
    json = request.json
    pw_hash = bcrypt.generate_password_hash(json['password']).decode('utf-8')
    new_volunteer = Volunteer(username=json['username'], password_hash=pw_hash)
    db.session.add(new_volunteer)
    db.session.commit()
    session['volunteer_id'] = new_volunteer.id
    return new_volunteer.to_dict(), 201



# SESSION LOGIN/LOGOUT#

@app.post('/login')
def login():
    json = request.json
    volunteer = Volunteer.query.where(Volunteer.username == json["username"]).first()
    if volunteer and bcrypt.check_password_hash(volunteer.password_hash, json['password']):
        session['volunteer_id'] = volunteer.id
        return volunteer.to_dict(), 201
    else:
        return {'message': 'Invalid username or password'}, 401

@app.get('/current_session')
def check_session():
    if logged_in():
        return get_current_user().to_dict(), 200
    else:
        return {}, 401

@app.delete('/logout')
def logout():
    print(session['volunteer_id'])
    session['volunteer_id'] = None
    print(session['volunteer_id'])
    return {}, 204

class PostIndex(Resource):

    def post(self):

        if session.get('volunteer_id'):

            request_json = request.get_json()

            image = request_json['image']
            caption = request_json['caption']

            try:

                post = Post(
                    image=image,
                    caption=caption,
                    volunteer_id=session['volunteer_id'],
                )

                db.session.add(post)
                db.session.commit()

                return post.to_dict(), 201

            except IntegrityError:

                return {'error': '422 Unprocessable Entity'}, 422

        return {'error': '401 Unauthorized'}, 401

# class CommentById(Resource):

#     def get(self, id):

#         comment = Comment.query.all()

#         if not comment:
#             response_body = {
#                 "error": "Comment not found"
#             }
#             return make_response(jsonify(response_body), 404)
    
#         response_body = comment.to_dict()

# api.add_resource(CommentById, '/commments/<int:id>')

# 




# api.add_resource(Signup, '/signup', endpoint='signup')
# api.add_resource(ClearSession, '/clear', endpoint='clear')
# api.add_resource(CheckSession, '/check_session', endpoint='check_session')
# api.add_resource(Login, '/login', endpoint='login')
# api.add_resource(Logout, '/logout', endpoint='logout')




if __name__ == '__main__':
    app.run(port=7000, debug=True)