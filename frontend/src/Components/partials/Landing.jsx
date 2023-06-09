
import React, { useState } from 'react'
import Navbar from './Navbar'
import '../../img/LandingBackground.jpg'
import './landing.css'
import { Link, useOutletContext } from 'react-router-dom';

export default function Landing() {
  let [userName,setUserName]=useState(false);
  let userData=useOutletContext()
  console.log(userData)
  return (
    <>
       <header class="header bg-dark" data-header onMouseLeave={()=>{setUserName((prev)=>{return false})}}>
    <div class="spCon " style={{margin:'none',backgroundColor:'black'}}>

      <Link href="/" class="logo">
        {/* <ion-icon name="barbell-sharp" aria-hidden="true"></ion-icon> */}

        <span class="span">FITNESS PALACE</span>
      </Link>

      <nav class="navbar m-0 p-0 " data-navbar >

        <button class="nav-close-btt" aria-label="close menu" data-nav-toggler>
          <ion-icon name="close-sharp" aria-hidden="true"></ion-icon>
        </button>

        <ul class="navbar-list navbarLinksPos">

          <li>
            <Link to="/" class="navbar-link fs-4" data-nav-link>HOME</Link>
          </li>

          <li>
            <Link to="/app/nearByGym" class="navbar-link fs-4" data-nav-link>NEARBY GYMS</Link>
          </li>

          <li>
            <Link to="/app" class="navbar-link fs-4" data-nav-link>PRODUCTS</Link>
          </li>

          <li>
            <Link to="/app/workouts" class="navbar-link fs-4" data-nav-link>WORKOUTS</Link>
          </li>

          


        </ul>

      </nav>
      
      <div className='align-butt'>
        {
          userData.username.length==0?(<>

          <Link to="/app/auth" class="btt btt-secondary">SIGN IN</Link>
          <Link to="/app/auth/register" class="btt btt-secondary">SIGN UP</Link>
          </>):(<>
            <ul className='navbar-list'>
                <li className="navbar-link ">
                    <button class="nav-link text-white" onMouseEnter={()=>{setUserName((prev)=>{return true})}}>
                      <Link style={{textDecoration:'none',color:'white',marginTop:'15px',width:'100px'}} to={'/app/profile'} className='Profile fs-4'>{userData.username}</Link>
                    </button>
                </li>
      
                <li className='navbar-link ms-4'>
                  <Link  to={'/app/auth/logout'} className='btt btt-secondary'>logout</Link>
                </li> 
                
              
            </ul>
          </>)
        }
      </div>
      <button class="nav-open-btt" aria-label="open menu" data-nav-toggler>
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </button>

    </div>
  </header>





  <main>
    <article>

      
      <section class="section hero bg-dark has-after has-bg-image" id="home" aria-label="hero" data-section
        style={{backgroundImage: "url('img/hero-bg.png')" }}>
        <div class="spCon">

          <div class="hero-content">

            <p class="hero-subtitle">
              <strong class="strong">WELCOME TO</strong>FITNESS PALACE
            </p>

            <h1 class="h1 hero-title">Work hard to become strong</h1>


            <Link to="/app/auth" class="btt btt-primary">GET STARTED</Link>

          </div>

          <div class="hero-banner">

            <img src="img/hero-banner.png" width="660" height="753" alt="hero banner" class="w-100" />

            <img src="img/hero-circle-one.png" width="666" height="666" aria-hidden="true" alt=""
              class="circle circle-1" />
            <img src="img/hero-circle-two.png" width="666" height="666" aria-hidden="true" alt=""
              class="circle circle-2" />

          

          </div>

        </div>
      </section>

      <section class="section abt" id="about" aria-label="about">
        <div class="spCon ">

          <div class="about-banner has-after">
            <img src="img/about-banner.png" width="660" height="648" loading="lazy" alt="about banner"
              class="w-100" />

            <img src="img/about-circle-one.png" width="660" height="534" loading="lazy" aria-hidden="true"
              alt="" class="circle circle-1" />
            <img src="img/about-circle-two.png" width="660" height="534" loading="lazy" aria-hidden="true"
              alt="" class="circle circle-2" />

            <img src="img/fitness.png" width="650" height="154" loading="lazy" alt="fitness"
              class="abs-img w-100" />
          </div>

          <div class="about-content">

            <p class="section-subtitle">Explore Gyms</p>

            <h2 class="h2 section-title">You can explore the nearby gym centres here</h2>

            <p class="section-text">
              Explore all the nearby gym centres near your location and start your fitness journey
            </p>

       

            <div class="wrapper">


            <Link to={'/app/nearByGym'} class="btt btt-primary">Explore Now</Link>

            </div>

          </div>

        </div>
      </section>






      <section class="section video" aria-label="video">
        <div class="spCon">

          <div class="video-card has-before has-bg-image"
            style={{backgroundImage: "url('img/video-banner.jpg')"}}>

            <h2 class="h2 card-title">Explore Greatest Fitness Heroes</h2>

            <button class="play-btt" aria-label="play video">
            <i class="fa-solid fa-play fa-fade fa-xl"></i>
            </button>

            <a href="#" class="btt-link has-before">Watch More</a>

          </div>

        </div>
      </section>






      <section class="section class bg-dark has-bg-image" id="class" aria-label="class"
        style={{backgroundImage:"url('img/classes-bg.png')"}}>
        <div class="spCon">

          <p class="section-subtitle">OUR PRODUCTS</p>

          <h2 class="h2 section-title text-center">FITNESS PRODUCTS FOR EVERY NEED</h2>

          <ul class="class-list has-scrollbar">

            <li class="scrollbar-item">
              <div class="class-card">

                <figure class="card-banner img-holder" style={{width:"416",height:"240"}}>
                  <img src="img/class-1.jpg" width="416" height="240" loading="lazy" alt="Weight Lifting"
                    class="img-cover"/>
                </figure>

                <div class="card-content">

                  <div class="title-wrapper">
                    <img src="img/class-icon-1.png" width="52" height="52" aria-hidden="true" alt=""
                      class="title-icon" />

                    <h3 class="h3">
                    <Link to="/app" class="card-title">SUPPLEMENTS</Link>
                    </h3>
                  </div>

                  <p class="card-text">
                    Explore a range of supplements according to your needs
                  </p>

                  <div class="card-progress">

                    <div class="progress-wrapper">
                 
                    </div>

                    <div class="progress-bg">
                      <div class="progress-bar" style={{width: "100%"}}></div>
                    </div>

                  </div>

                </div>

              </div>
            </li>

            <li class="scrollbar-item">
              <div class="class-card">

                <figure class="card-banner img-holder" style={{width:"416",height:"240"}}>
                  <img src="img/class-2.jpg" width="416" height="240" loading="lazy" alt="Cardio & Strenght"
                    class="img-cover" />
                </figure>

                <div class="card-content">

                  <div class="title-wrapper">
                    <img src="img/class-icon-2.png" width="52" height="52" aria-hidden="true" alt=""
                      class="title-icon" />

                    <h3 class="h3">
                      <Link to="/app" class="card-title">NUTRITION</Link>
                    </h3>
                  </div>

                  <p class="card-text">
                    Explore a range of nutrional foods according to your needs
                  </p>

                  <div class="card-progress">

                    <div class="progress-wrapper">
          
                    </div>

                    <div class="progress-bg">
                      <div class="progress-bar" style={{width:"100%"}}></div>
                    </div>

                  </div>

                </div>

              </div>
            </li>

            <li class="scrollbar-item">
              <div class="class-card">

                <figure class="card-banner img-holder" style={{width:"416",height:"240"}}>
                  <img src="img/class-3.jpg" width="416" height="240" loading="lazy" alt="Power Yoga"
                    class="img-cover" />
                </figure>

                <div class="card-content">

                  <div class="title-wrapper">
                    <img src="img/class-icon-3.png" width="52" height="52" aria-hidden="true" alt=""
                      class="title-icon" />

                    <h3 class="h3">
                    <Link to="/app" class="card-title">EQUIPMENTS</Link>
                    </h3>
                  </div>

                  <p class="card-text">
                    Explore a range of gym equipment according to your needs
                  </p>

                  <div class="card-progress">

                    <div class="progress-wrapper">
           
                    </div>

                    <div class="progress-bg">
                      <div class="progress-bar" style={{width: "100%"}}></div>
                    </div>

                  </div>

                </div>

              </div>
            </li>

  

          </ul>

        </div>
      </section>




      <section class="section blog" id="blog" aria-label="blog">
        <div class="spCon">

          <p class="section-subtitle">EXPLORE WORKOUTS</p>

          <h2 class="h2 section-title text-center">Best Fitness Workouts</h2>

          <ul class="blog-list has-scrollbar">

            <li class="scrollbar-item">
              <div class="blog-card">

                <div class="card-banner img-holder" style={{width: "440", height: "270"}}>
                  <img src="img/blog-1.jpg" width="440" height="270" loading="lazy"
                    alt="Going to the gym for the first time" class="img-cover" />

                </div>

                <div class="card-content">

                  <h3 class="h3">
                    <a href="#" class="card-title">Explore Cardio</a>
                  </h3>

                  <p class="card-text">
                    Cardio exercise, which is sometimes referred to as aerobic exercise, is any rhythmic activity that raises your heart rate into your target heart rate zone
                  </p>

                  <a href="#" class="btt-link has-before">Explore More</a>

                </div>

              </div>
            </li>

            <li class="scrollbar-item">
              <div class="blog-card">

                <div class="card-banner img-holder" style={{width: "440", height: "270"}}>
                  <img src="img/blog-2.jpg" width="440" height="270" loading="lazy"
                    alt="Parturient accumsan cacus pulvinar magna" class="img-cover" />

              
                </div>

                <div class="card-content">

                  <h3 class="h3">
                    <a href="#" class="card-title">Strength Training</a>
                  </h3>

                  <p class="card-text">
                    Strength training is also called resistance training because it involves strengthening and toning your muscles by contracting them against a resisting force.
                  </p>

                  <a href="#" class="btt-link has-before">Explore More</a>

                </div>

              </div>
            </li>

            <li class="scrollbar-item">
              <div class="blog-card">

                <div class="card-banner img-holder" style={{width: "440", height: "270"}}>
                  <img src="img/blog-3.jpg" width="440" height="270" loading="lazy"
                    alt="Risus purus namien parturient accumsan cacus" class="img-cover"/>

                </div>

                <div class="card-content">

                  <h3 class="h3">
                    <a href="#" class="card-title">Stretching</a>
                  </h3>

                  <p class="card-text">
                    Stretching is a form of physical exercise in which a specific muscle or tendon (or muscle group) is deliberately flexed or stretched in order to improve the muscle's felt elasticity and achieve comfortable muscle tone.
                  </p>

                  <a href="#" class="btt-link has-before">Explore More</a>

                </div>

              </div>
            </li>

          </ul>

        </div>
      </section>

    </article>
  </main>

  <footer class="footer">

    <div class="section footer-top bg-dark has-bg-image" style={{backgroundImage:"url('img/footer-bg.png')"}}>
      <div class="spCon">

        <div class="footer-brand">

          <a href="#" class="logo">

            <span class="span">FITNESS PALACE</span>
          </a>

          <p class="footer-brand-text">
            One Stop Fitness Website
          </p>

          <div class="wrapper">

            <img src="img/footer-clock.png" width="34" height="34" loading="lazy" alt="Clock" />

            <ul class="footer-brand-list">

              <li>
                <p class="footer-brand-title">MONDAY - FRIDAY</p>

                <p>5:00AM TO 10:00PM</p>
              </li>

              <li>
                <p class="footer-brand-title">SATURDAY - SUNDAY</p>

                <p>5:00AM - 1:00PM</p>
              </li>

            </ul>

          </div>

        </div>

        <ul class="footer-list">

          <li>
            <p class="footer-list-title has-before">OUR LINKS</p>
          </li>

          <li>
            <a href="#" class="footer-link">HOME</a>
          </li>

          <li>
            <a href="#" class="footer-link">NEARBY GYMS</a>
          </li>

          <li>
            <a href="#" class="footer-link">PRODUCTS</a>
          </li>

          <li>
            <a href="#" class="footer-link">WORKOUTS</a>
          </li>

          <li>
            <a href="#" class="footer-link">CONTACT US</a>
          </li>

        </ul>

        <ul class="footer-list">

          <li>
            <p class="footer-list-title has-before">CONTACTS</p>
          </li>

          <li class="footer-list-item">
            <div class="icon">
              <ion-icon name="location" aria-hidden="true"></ion-icon>
            </div>

            <address class="address footer-link">
              123/Block A, Sector 13,CHANDIGARH
            </address>
          </li>

          <li class="footer-list-item">
            <div class="icon">
              <ion-icon name="call" aria-hidden="true"></ion-icon>
            </div>

            <div>
              <a href="tel:18001213637" class="footer-link">9876543210</a>

              <a href="tel:+915552348765" class="footer-link">0172 3334545</a>
            </div>
          </li>

          <li class="footer-list-item">
            <div class="icon">
              <ion-icon name="mail" aria-hidden="true"></ion-icon>
            </div>

            <div>
              <a href="mailto:amit0061.be20@chitkara.edu.in" class="footer-link">amit0061.be20@chitkara.edu.in</a>

              <a href="mailto:amit0061.be20@chitkara.edu.in" class="footer-link">amit0061.be20@chitkara.edu.in</a>
            </div>
          </li>

        </ul>

        <ul class="footer-list">

          <li>
            <p class="footer-list-title has-before">FeedBack</p>
          </li>

          <li>
            <form action="" class="footer-form">
              <input type="email" name="email_address" aria-label="email" placeholder="Email Address" required
                class="input-field" />

              <button type="submit" class="btt btt-primary" aria-label="Submit">
                <ion-icon name="chevron-forward-sharp" aria-hidden="true"></ion-icon>
              </button>
            </form>
          </li>

          <li>
            <ul class="social-list">

              <li>
                <a href="#" class="social-link">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              </li>

              <li>
                <a href="#" class="social-link">
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              </li>

              <li>
                <a href="#" class="social-link">
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
              </li>

            </ul>
          </li>

        </ul>

      </div>
    </div>

    <div class="footer-bottom">
      <div class="spCon">

        <p class="copyright">
          &copy; 2023 FITNESS PALACE<a href="#" class="copyright-link">IP PROJECT</a>
        </p>

        <ul class="footer-bottom-list">

          <li>
            <a href="#" class="footer-bottom-link has-before">TERMS AND CONDITIONS</a>
          </li>

          <li>
            <a href="#" class="footer-bottom-link has-before">PRIVACY POLICY</a>
          </li>

        </ul>

      </div>
    </div>

  </footer>







  <a href="#top" class="back-top-btt" aria-label="back to top" data-back-top-btt>
    <ion-icon name="caret-up-sharp" aria-hidden="true"></ion-icon>
  </a>
    </>
  )
}
