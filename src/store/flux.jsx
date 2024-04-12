const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [],
      isAuthenticated: false,
      user: null,
      auth: false,
      token: null,
      clients: [
        {
          id: 1,
          firstName: "Javier",
          lastName: "Carthy",
          company: "lol1",
          status: "Active",
          address: "",
          email: "",
          phone: "",
          notes: [],
          schedule: [],
        },
        {
          id: 2,
          firstName: "Enrique",
          lastName: "Perez",
          company: "lol1",
          status: "Active",
          address: "",
          email: "",
          phone: "",
          notes: [],
          schedule: [],
        },
        {
          id: 3,
          firstName: "Pepito",
          lastName: "Perinola",
          company: "rofl",
          status: "Inactive",
          address: "",
          email: "",
          phone: "",
          notes: [],
          schedule: [],
        },
        {
          id: 4,
          firstName: "María",
          lastName: "Gómez",
          company: "lol2",
          status: "Active",
          address: "",
          email: "",
          phone: "",
          notes: [],
          schedule: [],
        },
        {
          id: 5,
          firstName: "Juan",
          lastName: "Martínez",
          company: "rofl",
          status: "Inactive",
          address: "",
          email: "",
          phone: "",
          notes: [],
          schedule: [],
        },
        {
          id: 6,
          firstName: "Ana",
          lastName: "López",
          company: "lol3",
          status: "Active",
          address: "",
          email: "",
          phone: "",
          notes: [],
          schedule: [],
        },
        {
          id: 7,
          firstName: "Pedro",
          lastName: "García",
          company: "rofl",
          status: "Active",
          address: "",
          email: "",
          phone: "",
          notes: [],
          schedule: [],
        },
        {
          id: 8,
          firstName: "Sofía",
          lastName: "Fernández",
          company: "lol2",
          status: "Active",
          address: "",
          email: "",
          phone: "",
          notes: [],
          schedule: [],
        },
        {
          id: 9,
          firstName: "Diego",
          lastName: "Sánchez",
          company: "lol3",
          status: "Inactive",
          address: "",
          email: "",
          phone: "",
          notes: [],
          schedule: [],
        },
        {
          id: 10,
          firstName: "Lucía",
          lastName: "Díaz",
          company: "rofl",
          status: "Active",
          address: "",
          email: "",
          phone: "",
          notes: [],
          schedule: [],
        },
        {
          id: 11,
          firstName: "Carlos",
          lastName: "Rodríguez",
          company: "lol1",
          status: "Inactive",
          address: "",
          email: "",
          phone: "",
          notes: [],
          schedule: [],
        },
        {
          id: 12,
          firstName: "Elena",
          lastName: "Hernández",
          address: "Rua São Gemil, 4425-692",
          company: "lol2",
          status: "Active",
          email: "elena@test.com",
          phone: "+351-555-555-555",
          notes: [
            {
              id: 1,
              title: "Use NIF in Invoices",
              category: "needs",
            },
            {
              id: 2,
              title: "Delivery in local address",
              category: "needs",
            },
            {
              id: 3,
              title: "Contact him by email",
              category: "needs",
            },
            {
              id: 4,
              title: "500 unids",
              category: "requirements",
            },
            {
              id: 5,
              title: "color orange",
              category: "preferences",
            },
          ],
          schedule: [
            {
              id: 1,
              title: "meeting with CEO",
              date: "2024-04-11T15:30:00",
            },
          ],
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      signUp: (data, navigate) => {
        console.log(data);
        return new Promise((resolve, reject) => {
          fetch("https://app.grupoerre.pt:1934/auth/create-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              if (data.message == "OK") {
                navigate("/");
                resolve(true);
              } else {
                resolve(false);
              }
            })
            .catch((error) => {
              console.error(error);
              reject(error);
            });
        });
      },
      login: (data, navigate) => {
        console.log(data);
        return new Promise((resolve, reject) => {
          fetch("https://app.grupoerre.pt:1934/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.token) {
                localStorage.setItem("token", data.token);

                setStore({ token: data.token });
                setStore({ auth: true });
                navigate("/clients");
                resolve(true);
              } else {
                //console.log("Password or mail incorrect");
                resolve(false);
              }
            })
            .catch((error) => {
              console.error(error);
              reject(error);
            });
        });
      },
      logOut: () => {
        localStorage.removeItem("token");
        setStore({ auth: false });
      },
      updateToken: () => {
        if (localStorage.getItem("token")) {
          setStore({ token: localStorage.getItem("token") });
        }
      },
      createClient: (client) => {
        const clients = getStore().clients;
        const maxId = Math.max(...clients.map((client) => client.id));
        const newId = maxId + 1;
        const newClient = { ...client, id: newId };
        const newList = clients.concat(newClient);
        setStore({ clients: newList });
        //console.log(newList);
      },
      editClient: (formData) => {
        const { clients } = getStore();
        const updatedClients = clients.map((client) => {
          if (client.id === formData.id) {
            return { ...client, ...formData };
          } else {
            return client;
          }
        });
        setStore({ clients: updatedClients });
      },
      getClient: (id) => {
        const clients = getStore().clients;
        const client = clients.find((client) => client.id === parseInt(id));
        if (!client) {
          console.log(`Cliente con ID ${id} no encontrado.`);
          return null;
        }
        return client;
      },
      deleteClientById: (id) => {
        const clients = getStore().clients;
        const updatedClients = clients.filter(
          (client) => client.id !== parseInt(id)
        );
        setStore({ clients: updatedClients });
      },
    },
  };
};

export default getState;
