import React from "react";
import { History } from "history";
import { useNavigate } from "react-router-dom";

export const SideNavigation = ({ serverId }: { serverId: string }) => {
  const navigate = useNavigate();

  return (
    <>
      <a
        onClick={(e) => {
          e.preventDefault();
          navigate(`/dashboard/${serverId}/configure`);
        }}
        href=""
      >
        Configure
      </a>
      <br />
      <a
        onClick={(e) => {
          e.preventDefault();
          navigate(`/dashboard/${serverId}/health`);
        }}
        href=""
      >
        Health
      </a>
      <br />
      <a
        onClick={(e) => {
          e.preventDefault();
          navigate(`/dashboard/${serverId}/logs`);
        }}
        href=""
      >
        Terminal
      </a>
      <br />
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
