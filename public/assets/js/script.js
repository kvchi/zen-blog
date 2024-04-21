// document.onload = () => {

const $ = (x) => document.querySelector(x);

const registerAdmin = $(".registerAdmin");
if (registerAdmin) {
  registerAdmin.onsubmit = async (e) => {
    e.preventDefault();
    const username = $("#username").value,
      password = $("#password").value;
    console.log({ username, password });
    try {
      const res = await fetch(`http://localhost:3000/auth/admin/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      console.log({ data });
      swal(data.message, { icon: res.error ? "error" : "success" }).then(
        (value) => {
          if (value) {
            // Redirect the user to another page
            window.location.href = "./create-post";
          }
        }
      );
    } catch (error) {
      // swal(data.message, { icon: res.error ? 'error': 'success'})
      console.log({ error });
    }
  };
}
const loginAdmin = $(".loginAdmin");
if (loginAdmin) {
  loginAdmin.onsubmit = async (e) => {
    e.preventDefault();
    const username = $("#username").value,
      password = $("#password").value;
    console.log({ username, password });
    try {
      const res = await fetch(`http://localhost:3000/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      console.log({ data });
      swal(data.message, { icon: res.error ? "error" : "success" }).then(
        (value) => {
          if (value) {
            // Redirect the user to another page
            window.location.href = "./index";
          }
        }
      );
    } catch (error) {
      // swal(data.message, { icon: res.error ? 'error': 'success'})
      console.log({ error });
    }
  };
}

const fetchPosts = async () => {
  // alert("We making the fetch request")
  const req = await fetch(`http://localhost:3000/post/allposts`);
  const res = await req.json();
  const posts = res.data;
  console.log({ posts });
};
fetchPosts();

const deletePost = async (id) => {
  try {
    const req = await fetch(`http://localhost:3000/post/delete`, {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    const res = await req.json();
    swal(res.message, { icon: res.error ? "error" : "success" });
  } catch (error) {
    swal(
      `Unable to Create Post`,
      "Something went wrong while attempting to create post",
      { icon: "error" }
    );
    console.log({ error });
  }
};

