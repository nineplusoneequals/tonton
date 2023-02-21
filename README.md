 const resp = await axios.post(
    `https://api.telegram.org/bot${accessToken}/setChatMenuButton`,
    {
      menu_button: {
        type: "web_app",
        text: "Launch Webapp",
        web_app: {
          url: url,
        },
      },
    }
