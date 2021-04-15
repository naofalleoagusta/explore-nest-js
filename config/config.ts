export const config = () => ({
  port: Number(process.env.PORT),
  mongodb_uri: process.env.MONGODB_URI,
});
