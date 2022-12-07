import '../../index.css'
import headshot from './headshot.png'
import github from './github.png'
import linkedin from './linkedin.png'

const About = () => {

    return (
        <div className='about-container'>
            <h1 className="page-header">Welcome to bestBnB! </h1>
            <img className='about-image' src={headshot} alt='headshot'></img>
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
                    music and the outdoors, and turn help bridge the gap between software development and my hobbies, I created this clone of AirBnB,
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
                    src = "https://camo.githubusercontent.com/a1b2dac5667822ee0d98ae6d799da61987fd1658dfeb4d2ca6e3c99b1535ebd8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f707974686f6e2d3336373041303f7374796c653d666f722d7468652d6261646765266c6f676f3d707974686f6e266c6f676f436f6c6f723d666664643534"
                    className='about-technologies-image'
                    alt='js'
                    />
                    <img
                    src = "https://camo.githubusercontent.com/43c40e9f61f01e780f4cfed5dafda9e3494310ba1b6ea11e20c4949e556a47c3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f666c61736b2d2532333030302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d666c61736b266c6f676f436f6c6f723d7768697465"
                    className='about-technologies-image'
                    alt='js'
                    />
                    <img
                    src = "https://camo.githubusercontent.com/f48e6e8822dbed2b14a693017b364d00813b7872df67d95e5844aa3cf94ec482/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f53514c416c6368656d792d3130303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d73716c266c6f676f436f6c6f723d424131323132266c6162656c436f6c6f723d41443030303026636f6c6f723d413930303030"
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
                </div>
            </div>
            </div>
        </div>
    )
}


export default About;
