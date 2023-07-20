from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class Charity(db.Model, SerializerMixin):
    __tablename__ = 'charities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    location = db.Column(db.String)
    date = db.Column(db.String)
    time = db.Column(db.String)
    description = db.Column(db.String)

    posts = db.relationship('Post', back_populates='charity', cascade='all, delete-orphan')
    volunteers = association_proxy('posts', 'volunteer', creator=lambda v: Post(volunteer=v))

    serialize_rules = ('-posts',)

    def __repr__(self):
        return f'<Charity#{self.id} added for: {self.name}, {self.location}, {self.date}, {self.time}, {self.description}>'

class Volunteer(db.Model, SerializerMixin):
    __tablename__ = 'volunteers'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, unique=True, nullable=False)

    posts = db.relationship('Post', back_populates='volunteer', cascade='all, delete-orphan')
    charities = association_proxy('posts', 'charity', creator=lambda c: Post(charity=c))

    comments = db.relationship('Comment', back_populates="volunteer")

    serialize_rules = ('-posts', '-comments')

    @validates('username')
    def validate_username(self, key, value):
        if not len(value) >= 8:
            raise ValueError("Please enter a username that is 8 or more characters long")
        return value
    
    @validates('password_hash')
    def validate_password(self, key, value):
        if not len(value) >= 8 :
            raise ValueError("Please enter a password that is 8 or more characters long")
        return value


    def __repr__(self):
        return f'<{self.username} has signed up with {self.password}>'


class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String)
    caption = db.Column(db.String)
    likes = db.Column(db.Integer)

    volunteer_id = db.Column(db.Integer, db.ForeignKey('volunteers.id'))
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'))

    volunteer = db.relationship('Volunteer', back_populates='posts')
    charity = db.relationship('Charity', back_populates='posts')

    comments = db.relationship('Comment', back_populates="post")


    serialize_rules = ('-charity', '-volunteer', '-comments')

    def __repr__(self):
        return f'<Experience has been posted with {self.image}, {self.caption}, {self.likes}>'

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment_post = db.Column(db.String)

    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    volunteer_id = db.Column(db.Integer, db.ForeignKey('volunteers.id'))

    post = db.relationship('Post', back_populates="comments")
    volunteer = db.relationship('Volunteer', back_populates="comments")

    serialize_rules = ('-post', '-volunteer')

    def __repr__(self):
        return f'<{self.comment_post} has been posted>'