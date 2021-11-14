import React from 'react';

export const SideNavigation = ({ history, serverId }) => {
  return (
    <>
      <a
        onClick={e => {
          e.preventDefault();
          history.push(`/dashboard/${serverId}/configure`);
        }}
        href=""
      >
        Configure
      </a>
      <br />
      <a
        onClick={e => {
          e.preventDefault();
          history.push(`/dashboard/${serverId}/health`);
        }}
        href=""
      >
        Health
      </a>
      <br />
      <a
        onClick={e => {
          e.preventDefault();
          history.push(`/dashboard/${serverId}/logs`);
        }}
        href=""
      >
        Terminal
      </a>
      <br />
      {/* <a
        onClick={e => {
          e.preventDefault();
          history.push(`/dashboard/${serverId}/backups`);
        }}
        href=""
      >
        Backups
      </a>
      <br />
      <a
        onClick={e => {
          e.preventDefault();
          history.push(`/dashboard/${serverId}/backups`);
        }}
        href=""
      >
        FTP
      </a>
      <br />
      <a
        onClick={e => {
          e.preventDefault();
          history.push(`/dashboard/${serverId}/backups`);
        }}
        href=""
      >
        Worlds
      </a>
      <br />
      <a
        onClick={e => {
          e.preventDefault();
          history.push(`/dashboard/${serverId}/backups`);
        }}
        href=""
      >
        Files
      </a>
      <br />
      <a
        onClick={e => {
          e.preventDefault();
          history.push(`/dashboard/${serverId}/backups`);
        }}
        href=""
      >
        Players
      </a> */}
    </>
  );
};
