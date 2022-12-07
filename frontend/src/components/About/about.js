
import headshot from './headshot.png'
import github from './github.png'
import linkedin from './linkedin.png'
import './about.css'

const About = () => {

    return (
        <div className='about-container'>
            <h1 className="about-page-header">Welcome to bestBnB! </h1>
            <img className='about-image' src={headshot} alt='headshot'></img>
            <></>
            <div className='about-header'>
                About Me:
            </div>
            <div className='about-body'>
                <div className='about-body-text'>
                    Hello! I am a full-stack software engineer from Denver, with a background in finance and a passion for building
                    things. I am a graduate of Miami University with a Bachelor's of Science in Finance and a Thematic Sequence in Information Systems & Analytics.
                    I am currently looking for a full-time position as a software engineer.
                </div>
                <div className='about-body-text'>
                    My favorite technologies include React and Redux, but I also enjoy database engineering with technologies like SQLAlchemy.
                    In my free time, I enjoy hiking with my dog, snowboarding, and going to concerts around Denver. I am very passionate about
                    music and the outdoors, and to bridge the gap between software development and my hobbies, I created this clone of AirBnB,
                    but with a focus on the outdoors and ski-in-ski-out houses. I hope you enjoy it!
                </div>
                <div className="github-linkedin-logos">
                    <a href='https://github.com/tbluher14' target="_blank">
                    <img className='home-page-github' src={github} alt="logo"></img>
                    </a>
                    <a href='https://www.linkedin.com/in/tom-bluher-172321115/' target="_blank">
                    <img className='home-page-linkedin' src={linkedin} alt='logo'></img>
                    </a>
                </div>
                <div className='about-technologies'>
                    <div className='about-technologies-header'>
                        Front End Technologies Used In This Project:
                    </div>
                    <div className='about-technologies-image-container'>
                    <img
                    src = "https://user-images.githubusercontent.com/20654267/192156837-122333b5-1337-4630-abcd-e48f538c141d.png"
                    className='about-technologies-image'
                    alt='js'
                    />
                    <img
                    src = "https://user-images.githubusercontent.com/20654267/192156876-64b1afdd-e93f-4f6b-a0ff-2d7e9b75258a.png"
                    className='about-technologies-image'
                    alt='js'
                    />
                    <img
                    src = "https://user-images.githubusercontent.com/20654267/192156881-268b4f35-02b2-4113-861b-c2ea54b6ff87.png"
                    className='about-technologies-image'
                    alt='js'
                    />
                    <img
                    src = "https://user-images.githubusercontent.com/20654267/192156890-ca8a0612-9350-4d10-88f7-cc09dd740865.png"
                    className='about-technologies-image'
                    alt='js'
                    />
                    <img
                    src = "https://user-images.githubusercontent.com/20654267/192156892-eddb0af2-29cc-46bf-9d6d-fc0ead32005b.png"
                    className='about-technologies-image'
                    alt='js'
                    />
                </div>
                <div className='about-technologies-header'>
                    Back End/Hosting Technologies Used In This Project:
                    </div>
                    <div className='about-technologies-image-container'>
                    <img
                    src = "https://camo.githubusercontent.com/9d07c04bdd98c662d5df9d4e1cc1de8446ffeaebca330feb161f1fb8e1188204/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d4637444631453f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d626c61636b"
                    className='about-technologies-image'
                    alt='js'
                    />
                    <img
                    src = "https://camo.githubusercontent.com/7d7b100e379663ee40a20989e6c61737e6396c1dafc3a7c6d2ada8d4447eb0e4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6e6f64652e6a732d3644413535463f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465"
                    className='about-technologies-image'
                    alt='js'
                    />
                    <img
                    src = "https://camo.githubusercontent.com/6c50eb6f911b1bcb4c0b790fb5e908bf896c525685839fa802c41349dcd1c8bf/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f53657175656c697a652d3532423045373f7374796c653d666f722d7468652d6261646765266c6f676f3d53657175656c697a65266c6f676f436f6c6f723d7768697465"
                    className='about-technologies-image'
                    alt='js'
                    />
                    <img
                    src= "https://camo.githubusercontent.com/281c069a2703e948b536500b9fd808cb4fb2496b3b66741db4013a2c89e91986/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f506f737467726553514c2d3331363139323f7374796c653d666f722d7468652d6261646765266c6f676f3d706f737467726573716c266c6f676f436f6c6f723d7768697465"
                    className='about-technologies-image'
                    alt='js'
                    />
                    <img
                    src="https://camo.githubusercontent.com/d18f98a93a8ca015503870e592f96dbdf86f41048e9de1fbbbd4b2dcc7c456b1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6865726f6b752d2532333433303039382e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6865726f6b75266c6f676f436f6c6f723d7768697465"
                    className='about-technologies-image'
                    alt='js'
                    />
                    <img
                    src="https://camo.githubusercontent.com/6f61ce982d7a61713d63c947148300012945bd4a4cafb8b9313e2426c5a1f273/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f457870726573732e6a732d3430344435393f7374796c653d666f722d7468652d6261646765"
                    alt='js'
                    className="about-technologies-image"
                    />
                </div>
            </div>
            </div>
        </div>
    )
}


export default About;
