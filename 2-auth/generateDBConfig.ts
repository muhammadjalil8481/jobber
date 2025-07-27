import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
import {sequelizeConfig} from "./src/database/connection"

// target file path
const outputDir = path.resolve(__dirname, "src/database");
const outputPath = path.join(outputDir, "config.json");

// ensure the directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir);
}

// delete(sequelizeConfig.development.dialectModule); // remove dialectModule to avoid circular reference issues
// write config.json
writeFileSync(outputPath, JSON.stringify(sequelizeConfig, null, 2));

console.log(`✅ Sequelize config.json generated at: ${outputPath}`);
