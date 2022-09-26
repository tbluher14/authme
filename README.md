This is my clone of AirBnb called BestBnB. I created this site using React, Redux, JavaScript, and Express. 

Here is the link to the deployed site on Heroku: https://authmetestdeploy.herokuapp.com/

To run locally, make sure ports 3000 and 8000 are not in use and run npm install at the root of both the backend and frontend folders, 
followed by npm start in each. This should start the application on your machine. 


Redux State Shape: 
store = {
    session: {},
    properties: {
        property: {
            propertyData,
        }
    },
    reviews: {
        reviewId: {
            reviewData,
        }
    }
}


Features:

User Authentication
New users can create an account with email address, and password. Upon submitting the signup form with invalid data, users will be informed about the validations they failed to pass.
New users without an account can log in as demo users.
Existing users can log in to their account.
Only logged-in users can access certain features, such as create spot listings, add reviews.
Users can log out account anytime and redirect to the home page.

Spots
Home page shows all the spots with preview image, name, location, price and average rating.
Clicking on each spots will lead to a spots detail page which shows the details including a description and reviews of the specified spot.
Logged in user have access to their spot.
Logged in users can create a new spot.
Logged in users edit their existing spot.
Logged in users can delete their spot.


Reviews
All reviews for a specific spots are displayed on the spot detail page.
Logged in users can create a review on a spots detail page.
A user can only leave one review per spots.
Logged in users can see all their past reviews.
Logged in users can edit their previously written reviews.
Logged in users can delete their previously written reviews.
