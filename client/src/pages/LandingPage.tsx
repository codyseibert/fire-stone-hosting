import React from 'react';
import worldImg from '../images/world.jpg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const HeroBanner = styled.div`
  color: white;
  height: 500px;
  background-image: url(${worldImg});
`;

const Glass = styled.div`
  margin-top: 160px;
`;

const PrimaryButton = styled.div`
  background: rgba(171, 210, 255);
`;

const Footer = styled.footer`
  background: rgba(171, 210, 255);
  padding-top: 40px;
  padding-bottom: 40px;
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0px;
  line-height: 32px;
  font-size: 14px;
`;

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeroBanner>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Glass>
                <h1>Performant Minecraft Hosting</h1>
                {/* <SpecialOffer>
                  SPECIAL OFFER! 50% off the first month!
                </SpecialOffer> */}
                <p>
                  Our servers start at $3.00 / GB, They're fully
                  customizable, able to run automated backups and
                  easily scale up and down. We also include your own
                  subdomain, and more...
                </p>
                <PrimaryButton
                  className="btn"
                  onClick={() => navigate('/plans')}
                >
                  Rent a Server
                </PrimaryButton>
              </Glass>
            </div>
          </div>
        </div>
      </HeroBanner>

      <div className="container mb-5">
        <h2 className="text-center mt-5 mb-5">
          All Our Servers Include...
        </h2>
        <div className="row mb-5">
          <div className="col text-center">
            <FontAwesomeIcon
              className="mb-4"
              size="3x"
              icon="shipping-fast"
            />
            <h2>Speedy Setup</h2>
            <p>
              Your server will be fully operational within a few
              minutes after initial purchase..
            </p>
          </div>
          <div className="col text-center">
            <FontAwesomeIcon
              className="mb-4"
              size="3x"
              icon="database"
            />
            <h2>Automated Backups</h2>
            <p>
              We automatically backup your server's
              configurations and installed modifications to
              allow easy restoration in the future.
            </p>
          </div>

          <div className="col text-center">
            <FontAwesomeIcon
              className="mb-4"
              size="3x"
              icon="shield-alt"
            />
            <h2>DDoS protection</h2>
            <p>
              Our services will mitigate DDoS attacks to
              help your server stay operational.
            </p>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col text-center">
            <FontAwesomeIcon
              className="mb-4"
              size="3x"
              icon="folder-open"
            />
            <h2>Full Access to Files</h2>
            <p>
              Easily upload, download, and modify your
              server files via FTP, or our web panel.
            </p>
          </div>
          <div className="col text-center">
            <FontAwesomeIcon
              className="mb-4"
              size="3x"
              icon="plug"
            />
            <h2>Mod & Plugin support</h2>
            <p>
              We provide support for almost all mod systems
              including Paper, Sponge, Spigot and Bukkit.
              Upload any custom modpacks, or use our web
              interface to easily install modpacks on the
              fly.
            </p>
          </div>

          <div className="col text-center">
            <FontAwesomeIcon
              className="mb-4"
              size="3x"
              icon="network-wired"
            />
            <h2>Ultra-Low Latency</h2>
            <p>
              Low ping means fun times. We provide locations
              around the globe to provide your players with
              the lowest ping possible.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col text-center">
            <FontAwesomeIcon
              className="mb-4"
              size="3x"
              icon="globe"
            />
            <h2>Free Subdomain</h2>
            <p>
              We provide a free subdomain that points to
              your server, which means easy access.
            </p>
          </div>
          <div className="col text-center">
            <FontAwesomeIcon
              className="mb-4"
              size="3x"
              icon="chart-line"
            />
            <h2>Monitoring</h2>
            <p>
              We have monitoring setup so you can tell when
              you server is about to reach it's limits.
            </p>
          </div>

          <div className="col text-center">
            <FontAwesomeIcon
              className="mb-4"
              size="3x"
              icon="terminal"
            />
            <h2>Terminal Access</h2>
            <p>
              Easily view your server logs and run commands
              directly from our web interface.
            </p>
          </div>
        </div>
      </div>

      <Footer>
        <div className="container">
          <div className="row">
            <div className="col">
              © 2021 Fire Stone Hosting
            </div>
            <div className="col">
              <h5>Support</h5>
              <List>
                <li>
                  <Link to="contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="tickets">Tickets</Link>
                </li>
                <li>
                  <Link to="dashboard">Dashboard</Link>
                </li>
              </List>
            </div>
            <div className="col">
              <h5>Information</h5>
              <List>
                <li>
                  <Link to="faq">FAQ</Link>
                </li>
                <li>
                  <Link to="tutorials">Tutorials</Link>
                </li>
                <li>
                  <Link to="blog">Blog</Link>
                </li>
              </List>
            </div>
            <div className="col">
              <h5>About</h5>
              <List>
                <li>
                  <Link to="about">About</Link>
                </li>
                <li>
                  <Link to="tos">Terms of Service</Link>
                </li>
                <li>
                  <Link to="privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="sla">SLA Policy</Link>
                </li>
              </List>
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
};
