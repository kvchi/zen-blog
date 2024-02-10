const $ = x => document.querySelector(x);

      const registerAdmin = $(".registerAdmin")

      registerAdmin.onsubmit = async(e) => {
        e.preventDefault()
        const username = $("#username").value, password = $("#password").value
        console.log({username, password})
        try {
          const res = await fetch(`http://localhost:3000/auth/admin/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
          })
          const data = await res.json()
          console.log({data})
          swal(data.message, { icon: res.error ? 'error': 'success'})
        } catch (error) {
          // swal(data.message, { icon: res.error ? 'error': 'success'})
          console.log({error})
        }
      }