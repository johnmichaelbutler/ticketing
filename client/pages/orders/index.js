const OrderIndex = ({ orders }) => {
  return (
    <div>
      <h1 className="align-middle">Your Orders</h1>
      <div className="row">
        <span className="col-sm">Ticket Name</span>
        <span className="col-sm">Status</span>
        <span className="col-sm">Date</span>
        <br />
      </div>
      <div>
        {orders.map((order) => {
          const date = new Date(order.expiresAt).toDateString();
          return (
            <div className="row" key={order.id}>
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
