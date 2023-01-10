<template>
  <div class="footer">
    <div class="divider"></div>
    <br />
    <div class="container">
      <div class="row">
        <div class="col-md-3 contacts">
          <div class="row">
            <span onclick="window.open('https://github.com/darkzek/');">
              <a class="fi fi-github"></a>
              <b>GITHUB</b>
            </span>
            <p>
              Follow for open source projects like
              <a
                href="https://github.com/darkzek/chickenbot/"
                target="_blank"
                class="link"
                >Chicken Bot</a
              >
              and
              <a
                href="https://github.com/DarkZek/golden-ratio-project"
                target="_blank"
                class="link"
                >Golden Ratio Viewer</a
              >
            </p>
          </div>
          <div class="row">
            <span onclick="window.open('https://gitlab.com/DarkZek/');">
              <a class="fi fi-gitlab"></a>
              <b>GITLAB</b>
            </span>
            <p>
              Follow for open source projects like
              <a
                href="https://gitlab.com/DarkZek/AshcollAutoLogin/-/tree/Initialize"
                class="link"
                >Initialize</a
              >
              or
              <a href="https://gitlab.com/DarkZek/thiscord" class="link"
                >Thiscord</a
              >
            </p>
          </div>
          <div class="row">
            <span
              onclick="window.open('https://www.linkedin.com/in/marshall-scott-746989167/');"
            >
              <a class="fi fi-linkedin"></a>
              <b>LINKEDIN</b>
            </span>
            <p>Connect with me on LinkedIn</p>
          </div>
        </div>
        <div class="col-1"></div>
        <div class="col-md-8 contactme">
          <div class="row">
            <div class="col-3"></div>
            <div class="col-9">
              <br />
              <h2>Have a project in mind?</h2>
              <br />
              <a href="mailto:mashdowne@hotmail.co.nz" class="btn btn-primary"
                >Get in touch</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <h6 class="copyright">© Marshall Scott. All Rights Reserved</h6>
  </div>
</template>

<style scoped>
/* Mobile */
@media (max-width: 600px) {
  .project br {
    display: none;
  }

  .footer {
    margin-top: 10px !important;
    padding: 0px 20px 0px 20px;
  }

  .footer .copyright {
    margin-top: 20px;
  }
}

/* Footer */
.footer {
  margin-top: 100px;
}

.footer .divider {
  width: 94vw;
  margin-left: 3vw;
  height: 2px;
  background-color: #f3f4f5;
  border-radius: 10px;
}

.footer .contacts {
  border-right: #f3f4f5 2px solid;
  padding: 20px 0px 20px 0px;
}

.footer .contacts .row * {
  display: inline-block;
}

.footer .fi {
  color: white;
}

.footer span {
  cursor: pointer;
}

.footer p {
  color: rgb(92, 92, 92);
}

.footer .copyright {
  color: grey;
  text-align: center;
  text-decoration: none;
  width: 100%;
  font-weight: normal;
}

.footer .col-3 img {
  width: 100%;
  height: auto;
}

.footer .contactme {
  margin-top: 30px;
}

.footer .contactme h2 {
  font-family: "Ubuntu", sans-serif;
}

.footer .contactme .btn {
  padding: 10px;
}
</style>
