import React from "react";

export default function AdminFooter() {
  return (
    <>
      <footer className="footer">
        <div className="container-fluid">
         
          <div className="copyright ml-auto">
            Copyright &copy;&nbsp;
            {new Date().getFullYear()}, made with <i className="la la-heart heart text-danger"></i>{" "}
            by{" "}
            <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">
              ENSI {/* Adjust this to your actual name or organization */}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
