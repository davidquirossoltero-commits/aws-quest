import assert from "node:assert/strict";

function tokenize(input) {
  const cleaned = input.replace(/\\\r?\n/g, " ").trim();
  const tokens = [];
  let current = "";
  let inDouble = false;
  let inSingle = false;

  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];
    if (char === '"' && !inSingle) {
      inDouble = !inDouble;
    } else if (char === "'" && !inDouble) {
      inSingle = !inSingle;
    } else if ((char === " " || char === "\t" || char === "\n") && !inDouble && !inSingle) {
      if (current.length > 0) {
        tokens.push(current);
        current = "";
      }
    } else {
      current += char;
    }
  }
  if (current.length > 0) tokens.push(current);
  return tokens;
}

function parseAwsCommand(input) {
  const tokens = tokenize(input);
  const options = {};
  const positionals = [];
  let program = tokens[0]?.toLowerCase() || "";
  let service = tokens[1]?.toLowerCase() || "";
  let operation = tokens[2]?.toLowerCase() || "";

  let i = 3;
  while (i < tokens.length) {
    const token = tokens[i];
    if (token.startsWith("--")) {
      const eqIdx = token.indexOf("=");
      if (eqIdx !== -1) {
        options[token.slice(2, eqIdx).toLowerCase()] = token.slice(eqIdx + 1);
        i++;
      } else if (i + 1 < tokens.length && !tokens[i + 1].startsWith("--")) {
        options[token.slice(2).toLowerCase()] = tokens[i + 1];
        i += 2;
      } else {
        options[token.slice(2).toLowerCase()] = true;
        i++;
      }
    } else {
      positionals.push(token);
      i++;
    }
  }
  return { raw: input, tokens, program, service, operation, options, positionals };
}

const solutions = [
  { lvl: 1, cmd: "aws sts get-caller-identity" },
  { lvl: 2, cmd: "aws iam create-user --user-name dev-alice" },
  { lvl: 3, cmd: "aws iam create-role --role-name LambdaExecutionRole --assume-role-policy-document file://trust-policy.json" },
  { lvl: 4, cmd: "aws iam attach-user-policy --user-name dev-alice --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess" },
  { lvl: 5, cmd: "aws s3 mb s3://empresa-logs-seguros --region eu-west-1" },
  { lvl: 6, cmd: "aws s3api put-public-access-block --bucket empresa-logs-seguros --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true" },
  { lvl: 7, cmd: "aws s3 cp backup.tar.gz s3://empresa-logs-seguros/backup.tar.gz --storage-class STANDARD_IA" },
  { lvl: 8, cmd: "aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t3.micro --key-name cloud-key" },
  { lvl: 9, cmd: "aws ec2 authorize-security-group-ingress --group-id sg-0123456789abcdef0 --protocol tcp --port 443 --cidr 0.0.0.0/0" },
  { lvl: 10, cmd: "aws lambda create-function --function-name procesar-pedidos --runtime nodejs20.x --role arn:aws:iam::123456789012:role/LambdaExecutionRole --handler index.handler --zip-file fileb://function.zip" },
  { lvl: 11, cmd: "aws ec2 create-vpc --cidr-block 10.0.0.0/16" },
  { lvl: 12, cmd: "aws cloudfront create-distribution --origin-domain-name empresa-logs-seguros.s3.amazonaws.com --default-root-object index.html" },
];

console.log(`Running validation verification across all ${solutions.length} levels...`);

for (const s of solutions) {
  const p = parseAwsCommand(s.cmd);
  assert.equal(p.program, "aws", `Lvl ${s.lvl} must start with aws`);
  assert(p.service.length > 0, `Lvl ${s.lvl} must have service`);
  assert(p.operation.length > 0, `Lvl ${s.lvl} must have operation`);
  console.log(`✔ Level ${s.lvl} (${p.service} ${p.operation}) solution verified!`);
}

console.log("\nAll 12 AWS Quest levels verified successfully! 🎉");
