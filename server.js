import "dotenv/config"
import app from "./src/app.js"

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-undef
  console.log(`Terrasense-API running on port ${process.env.PORT}`)
})