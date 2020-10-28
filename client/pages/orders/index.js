const OrderIndex = ({ orders }) => {
  return (
    <div className="mt-5">
      <h1 className="text-center mb-3">Your Orders</h1>
      <div className="d-flex flex-row text-center border-bottom mt-3">
        <span className="col-sm ">Ticket Name</span>
        <span className="col-sm">Status</span>
        <span className="col-sm">Date</span>
        <br />
      </div>
      <div>
        {orders.map((order) => {
          const date = new Date(order.expiresAt).toDateString();
          return (
            <div
              className="row text-center mt-3 mb-3 border-bottom"
              key={order.id}
            >
              <span className="col-sm">{order.ticket.title}</span>
              <span className="col-sm">{order.status}</span>
              <span className="col-sm">{date}</span>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default OrderIndex;
