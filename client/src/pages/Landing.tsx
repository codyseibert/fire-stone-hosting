import React from 'react';
import worldImg from '../images/world.jpg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeroBanner = styled.div`
  color: white;
  height: 500px;
  background-image: url(${worldImg});
`;

const Glass = styled.div`
  position: relative;
  background: rgba(171, 210, 255, 0.322);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: #f8f9fa;
  color: black;
  padding: 20px;
  margin-top: 140px;
`;

const SpecialOffer = styled.h4`
  color: red;
`;

const PrimaryButton = styled.div`
  background: rgba(171, 210, 255);
`;

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeroBanner>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Glass>
                <h1>Quality Minecraft Hosting</h1>
                <SpecialOffer>
                  SPECIAL OFFER! 50% off the first month!
                </SpecialOffer>
                <p>
                  Our servers start at $3.00 / GB, are fully
                  customizable, contain automatted backups,
                  easily scale up and down, and your own
                  subdomain is included, and more...
                </p>
                <PrimaryButton
                  className="btn"
                  onClick={() => navigate('/plans')}
                >
                  Create Your Server
                </PrimaryButton>
              </Glass>
            </div>
          </div>
        </div>
      </HeroBanner>

      <div className="container">
        <h2 className="text-center mt-5 mb-5">
          Our Features
        </h2>
        <div className="row mb-4">
          <div className="col">
            <h2>INSTANT SETUP</h2>
            <p>
              After purchasing your server, you will be able
              to connect in minutes after the server full
              initializes your new world.
            </p>
          </div>
          <div className="col">
            <h2>Automated Backups</h2>
            <p>
              What happens if your server dies after you
              have spent many hours modding it and then
              playing Minecraft? Do you have to start all
              over from scratch? Of course not, we take
              regular offsite backups of every Minecraft
              server. We can restore your server from these
              backups if you need us to.
            </p>
          </div>

          <div className="col">
            <h2>DDoS protection</h2>
            <p>
              We understand that you expect your Minecraft
              server to be available to play all the time.
              We proactively monitor for DDoS attacks, even
              the smallest attacks, and then we
              automatically take steps to mitigate the
              attack. This means your server will not be
              forced offline by somebody who is randomly
              sending out DDoS attacks to public-facing
              servers.
            </p>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col">
            <h2>Full Access to Files</h2>
            <p>
              All of our servers run Ubuntu 18.04, one of
              the most robust and stable Linux
              distributions. You are provided wit full
              access to the server, enabling to administer
              your server via our control panel, and to
              access other services such as MySQL and
              connect via FTP to transfer files.
            </p>
          </div>
          <div className="col">
            <h2>Mod & Plugin support</h2>
            <p>
              You can play using any possible plugin that is
              available using Paper, Sponge, Spigot and
              Bukkit. You can use the forge to create your
              own modpacks, combining your favourite mods.
              You can also install one of the many popular
              modpacks we have available such as SkyFactory,
              FTB Infinity, StoneBlock and many others.
            </p>
          </div>

          <div className="col">
            <h2>Ultra-Low Latency</h2>
            <p>
              Ask any online gamer what’s is most important
              when it comes to online gameplay, and they
              will say its all about the ping. The better
              your latency the faster your access to the
              server, and the more responsive gameplay will
              be. We provide a number of locations around
              the globe, so you can choose the server
              location closest to you, to keep your ping
              times as low as possible.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h2>Free Subdomain</h2>
            <p>
              Every server we rent comes with its own free
              subdomain of yoursubdomain.ourdomain.com. This
              makes it easier for you and your players to
              connect to your server. If you have your own
              top-level domain, or would like to buy a new
              one from us, then you can use that too.
            </p>
          </div>
          <div className="col">
            <h2>Automated Backups</h2>
            <p>
              What happens if your server dies after you
              have spent many hours modding it and then
              playing Minecraft? Do you have to start all
              over from scratch? Of course not, we take
              regular offsite backups of every Minecraft
              server. We can restore your server from these
              backups if you need us to.
            </p>
          </div>

          <div className="col">
            <h2>DDoS protection</h2>
            <p>
              We understand that you expect your Minecraft
              server to be available to play all the time.
              We proactively monitor for DDoS attacks, even
              the smallest attacks, and then we
              automatically take steps to mitigate the
              attack. This means your server will not be
              forced offline by somebody who is randomly
              sending out DDoS attacks to public-facing
              servers.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
