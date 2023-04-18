import React from "react";
import { FaEthereum } from "react-icons/fa";
import Identicons from "react-identicons";
import { Link } from "react-router-dom";
import Sidenav from "../components/Sidenav";
import { daysRemaining, truncate, useGlobalState } from "../store";
const Campaigns = () => {
  const [projects] = useGlobalState("projects");
  return (
    <div className="flex flex-row">
      <div className="absolute left-0">
        <Sidenav />
      </div>
      <div className="md:ml-60 ml-0 md:mt-0 mt-24 flex justify-center items-center flex-wrap w-full h-screen">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ project }) => {
  const expired = new Date().getTime() > Number(project?.expiresAt + "000");
  return (
    <div id="projects" className="rounded-2xl shadow-lg bg-white w-64 m-4">
      <Link to={"/projects/" + project.id}>
        <img
          src={project.imageURL}
          alt={project.title}
          className="rounded-xl h-64 w-full object-cover"
        />

        <div className="p-4">
          <h5>{truncate(project.title, 25, 0, 28)}</h5>

          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <Identicons
                className="rounded-full shadow-md"
                string={project.owner}
                size={15}
              />
              <small className="text-gray-700">
                {truncate(project.owner, 4, 4, 11)}
              </small>
            </div>

            <small className="text-gray-500">
              {expired ? "Expired" : daysRemaining(project.expiresOn) + " left"}
            </small>
          </div>

          <div className="w-full bg-gray-300">
            <div
              className="bg-[#4F0ADF] text-xl font-medium text-green-100 text-center p-0.5 leading-none rounded-l-full h-1 max-w-full"
              style={{ width: `${(project.raised / project.goal) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center flex-wrap mt-4 mb-2 text-gray-500 font-bold">
            <small>{project.raised} ETH Raised</small>
            <small className="flex justify-start items-center">
              <FaEthereum />
              <span>{project.cost} ETH</span>
            </small>
          </div>

          <div
            className="flex justify-between items-center flex-wrap
            mt-4 mb-2 text-gray-500 font-bold"
          >
            <small>
              {project.backers} Backer{project.backers === 1 ? "" : "s"}
            </small>
            <div>
              {expired ? (
                <small className="text-red-500">Expired</small>
              ) : project?.status === 0 ? (
                <small className="text-gray-500">Open</small>
              ) : project?.status === 1 ? (
                <small className="text-green-500">Accepted</small>
              ) : project?.status === 2 ? (
                <small className="text-gray-500">Reverted</small>
              ) : project?.status === 3 ? (
                <small className="text-red-500">Deleted</small>
              ) : (
                <small className="text-orange-500">Paid</small>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Campaigns;
