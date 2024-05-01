import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
  const projects = ref([
    {
      id: "flixrapp",
      name: "Flixrapp.com",
      image: "/content/flixr/Cover.webp",
      url: "https://flixrapp.com/",
      url_tyle: "local",
      description:
        "Flixr started as a frustration with managing tv show notifications for so many different streaming platforms. It collates data from online <b>API's</b> to provide one succinct user interface. It uses a custom password-less authentication solution to accommodate on-boarding.",
      content:
        "<h2>Flixrapp.com</h2><br><p>Flixr started as a frustration with managing new show notifications for so many different streaming platforms. I decided to solve that problem with a centralised repository for storing shows you've watched so that you can reminded each and every time a new seasons releases. It has since gained more functionality such as downloading wallpaper packs with screenshots from your content.</p><h3>Tech Used</h3><ul><li>mySQL</li><li>PHP 7.0</li><li>Laravel Framework</li><li>Nginx</li><li>Docker</li><li>Rust</li><li>Sendmail</li><li>VueJS</li></ul>",
      color: "#7782d2",
      video: "/content/flixr/video",
      // Ordered from smallest to largest
      video_sizes: [[1920, 1080]],
      tags: ["Vue.JS", "Docker", "Laravel", "mySQL"],
    },
    {
      id: "rustcraft",
      name: "RustCraft",
      image: "/content/rustcraft/Cover.webp",
      url: "./content/rustcraft/index.html",
      url_tyle: "local",
      description:
        "RustCraft is a from scratch modern alternative to the official minecraft client. Written in Rust and using wgpu-rs it focuses on delivering high performance voxel rendering. It features an Entity Component System <b>(ECS) based rendering system</b>, threaded networking, mesh building, asset management, render engine and AABB physics engine providing blazing fast performance.",
      content:
        "<h2>RustCraft</h2><a>RustCraft is a from scratch alternative minecraft client. Written in Rust and wgpu-rs (webgpu/vulkan/directx wrapper) it focuses on delivering high performance voxel rendering.</a><br><br><h4>Progress</h4><a>The project contains a threaded Minecraft 1.15.2 <b>network protocol parser</b>, an AABB <b>physics engine</b>, custom <b>mesh building</b> solution, <b>asset management</b> / texture atlas building, custom implementation of <b>Minecraft blocks</b> along with a <b>User Interface</b> solution.",
      color: "#ef323d",
      video: "./content/rustcraft/video_nointro",
      // Ordered from smallest to largest
      video_sizes: [
        [720, 576],
        [1080, 720],
        [1920, 1080],
      ],
      tags: ["ECS", "Rendering", "Rust", "Networking"],
    },
    {
      id: "mobingo",
      name: "Charchingo",
      image: "/content/mobingo/Cover.webp",
      url: "https://play.rubysweeps.com",
      url_tyle: "external",
      description:
        "Charchingo is an Online Bingo Hall made for Alabama customers by Ruby Play Network. It is a commercial level application developed for an in person bingo hall, High Rollers. It supports accepting <b>Payments</b> & <b>Cryptocurrencies</b>, faciliates the games, provides <b>rewards and jackpots</b>.",
      content:
        "<h2>Charchingo</h2>An overhaul of the Charchingo platforms User Interface was my first project in my employment with Ruby Play Network. ",
      color: "#F7941D",
      video: "/content/mobingo/video",
      // Ordered from smallest to largest
      video_sizes: [[1920, 1080]],
      tags: ["Quasar", "JS", "Paypal", "Professional"],
    },
    {
      id: "aliensareattacking",
      name: "Aliens Are Attacking",
      image: "/content/aliens_are_attacking/Cover.webp",
      url: "/content/aliens_are_attacking/WebGL/index.html",
      description:
        "Flixr started as a frustration with managing tv show notifications for s many different streaming platforms. It collates data from online <b>API's</b> to provide one succinct user interface. It uses a custom password-less authentication solution to accommodate on-boarding.",
      content:
        '<h2>Aliens Are Attacking</h2><br><p>This is a game made in collaboration using the <b>Unity</b> game engine in C# for a Game Jam held online in early 2019. I formed a team with <a href="https://jameskellie.dev/" target="_blank">James Kellie</a> to enter, the theme being selected to be <b>Destruction</b>!<br><br>We eagerly created a prototype of the idea, then collaboratively designed the art and added more functionality to the scene. This gave us just enough time to build an executable of the game in time for submission!<br><br>This project taught me about working in a team environment as well as provided a lot of fun joining and programming with other software developers!</p><a href="https://simplyjpk.itch.io/aliens-are-attacking" target="_blank">Check it out on itch.io</a>',
      color: "#4d4d4d",
      video: "./content/aliens_are_attacking/video",
      // Ordered from smallest to largest
      video_sizes: [[600, 600]],
      tags: ["Vue.JS", "Docker", "Laravel", "mySQL"],
    },
    {
      id: "christmasevent2019",
      name: "UDC Christmas Event 2019",
      image: "/content/ChristmasEvent2019/Cover.webp",
      url: "/content/ChristmasEvent2019/index.html",
      url_tyle: "local",
      description:
        'This christmas event was a Capture the Flag challenge for the online community UDC at <a href="https://discord.gg/bu3bbby" target="_blank">Discord</a>. It included SSH puzzles,  web exploits are more!',
      content:
        '<h2>UDC Christmas Event</h2><br><p>This christmas event was a Capture the Flag programming challenge made for the online community on <a href="https://discord.gg/bu3bbby" target="_blank">Discord</a>. It was quite an adventure because it gave me an excuse to try out many different technologies and combine them into one polished product.</p><h3>Explorations</h3><ul><li><b>Docker</b><br><span>The challenge involved submitting a .java file, this meant my web server had to execute remote code in a safe fashion. For this I booted up a Java docker container to compile and run the jar file, reading the stack trace through the output string. This lead me to setting up a robust and modular system to run the entire system based off docker.</p></li>',
      color: "#ffb700",
      tags: ["Nginx", "Docker", "C#", "SSH"],
    },
    {
      id: "byteunwrapped",
      name: "Byte Unwrapped",
      image: "/content/byte_unwrapped/Cover.webp",
      url: "https://blog.flixrapp.com/",
      description:
        "My development blog where knowledge is spread, experiments are conducted, and progress is reported. It is made in <b>Wordpress</b> which supports comments, posts and an account system. Running on a Linux server in my house, Byte Unwrapped is a communication portal to the world.",
      content:
        "<h2>Byte Unwrapped</h2><p>My development blog where knowledge is spread, experiments are conducted, and progress is reported. It is made in <b>Wordpress</b> which supports comments, posts and an account system.<br><br>It contains content from my University courses as well as personal projects.</p>",
      color: "#ee6400",
      tags: ["Wordpress", "Rust", "CSS"],
    },
    {
      id: "christmasevent2018",
      name: "UDC Christmas Event 2018",
      image: "/content/ChristmasEvent2018/Cover.webp",
      url: "/content/ChristmasEvent2018/index.html",
      url_tyle: "local",
      description:
        'This christmas event was a Capture the Flag challenge for the online community UDC at <a href="https://discord.gg/bu3bbby" target="_blank">Discord</a>. It included SSH puzzles,  web exploits are more!',
      content:
        '<h2>UDC Christmas Event</h2><br><p>This christmas event was a Capture the Flag programming challenge made for the online community on <a href="https://discord.gg/bu3bbby" target="_blank">Discord</a>. It was quite an adventure because it gave me an excuse to try out many different technologies and combine them into one polished product.</p><h3>Explorations</h3><ul><li><b>Docker</b><br><span>The challenge involved connecting to a ssh server, this meant my web server had to execute remote login in a safe fashion. For this I booted up an ubuntu docker container to login to. This lead me to setting up a robust and modular system to run the entire system based off docker.</p></li>',
      color: "#72a2c9",
      tags: ["Nginx", "Docker", "C#", "SSH"],
    },
    /**
     {
         id: "christmasevent2021",
        name: "UDC Christmas Event 2021",
        image: "/content/ChristmasEvent2021/Cover.webp",
        url: "./content/ChristmasEvent2021/index.html",
        url_tyle: "local",
        description: "This christmas event is an upcoming Capture the Flag programming adventure made for the online community Unity Developer Community using mainly <b>C Sharp</b>. It includes a Discord Bot, Networking challenges based on the <b>Docker</b> platform. It releases <i>December 2021</i>",
        content: "<h2>UDC Christmas Event</h2>This christmas event is an upcoming Capture the Flag programming adventure made for the online community Unity Developer Community using mainly <b>C Sharp</b>. It includes a Discord Bot, Networking challenges based on the <b>Docker</b> platform.<br><br>Releases <i>December 2021</i>",
        color: "#64b82c",
        video: "./content/ChristmasEvent2021/video",
        // Ordered from smallest to largest
        video_sizes: [[720, 405], [1000, 562], [1920, 1080]],
        tags: ["Nginx", "Docker", "C#", "SSH"]
    },
    **/
  ]);

  return { projects };
});
