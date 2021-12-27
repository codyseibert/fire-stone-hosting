import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavigationLink = styled.a`
  font-size: 18px;
  display: flex;
  align-items: right;
  margin-bottom: 20px;
  text-decoration: none;

  :hover {
    color: red;
  }
`;

export const SideNavigation = ({
  serverId,
}: {
  serverId: string;
}) => {
  const navigate = useNavigate();

  return (
    <>
      <NavigationLink
        onClick={(e) => {
          e.preventDefault();
          navigate(`/dashboard/${serverId}/overview`);
        }}
        href=""
      >
        <FontAwesomeIcon icon="power-off" />
        <span className="ps-2">Overview</span>
      </NavigationLink>
      <NavigationLink
        onClick={(e) => {
          e.preventDefault();
          navigate(`/dashboard/${serverId}/configure`);
        }}
        href=""
      >
        <FontAwesomeIcon icon="cogs" />
        <span className="ps-2">Configure</span>
      </NavigationLink>
      {/* <br />
      <a
        onClick={(e) => {
          e.preventDefault();
          navigate(`/dashboard/${serverId}/health`);
        }}
        href=""
      >
        Health
      </a> */}
      <NavigationLink
        onClick={(e) => {
          e.preventDefault();
          navigate(`/dashboard/${serverId}/logs`);
        }}
        href=""
      >
        <FontAwesomeIcon icon="terminal" />
        <span className="ps-2">Terminal</span>
      </NavigationLink>

      <NavigationLink
        onClick={(e) => {
          e.preventDefault();
          navigate(`/dashboard/${serverId}/ftp`);
        }}
        href=""
      >
        <FontAwesomeIcon icon="folder-open" />
        <span className="ps-2">FTP</span>
      </NavigationLink>

      <NavigationLink
        onClick={(e) => {
          e.preventDefault();
          navigate(`/dashboard/${serverId}/health`);
        }}
        href=""
      >
        <FontAwesomeIcon icon="heartbeat" />
        <span className="ps-2">Health</span>
      </NavigationLink>

      <NavigationLink
        onClick={(e) => {
          e.preventDefault();
          navigate(`/dashboard/${serverId}/worlds`);
        }}
        href=""
      >
        <FontAwesomeIcon icon="globe" />
        <span className="ps-2">Worlds</span>
      </NavigationLink>
      {/* <a
        onClick={e => {
          e.preventDefault();
          navigate(`/dashboard/${serverId}/backups`);
        }}
        href=""
      >
        Backups
      </a>
      <br />
      <a
        onClick={e => {
          e.preventDefault();
          navigate(`/dashboard/${serverId}/backups`);
        }}
        href=""
      >
        FTP
      </a>
      <br />
      <a
        onClick={e => {
          e.preventDefault();
          navigate(`/dashboard/${serverId}/backups`);
        }}
        href=""
      >
        Worlds
      </a>
      <br />
      <a
        onClick={e => {
          e.preventDefault();
          navigate(`/dashboard/${serverId}/backups`);
        }}
        href=""
      >
        Files
      </a>
      <br />
      <a
        onClick={e => {
          e.preventDefault();
          navigate(`/dashboard/${serverId}/backups`);
        }}
        href=""
      >
        Players
      </a> */}
    </>
  );
};
