import { parseAwsCommand } from "./cliParser";
import type { Level, ValidationResult, World } from "./types";

export const WORLDS: World[] = [
  {
    id: "world-1",
    name: "Mundo 1: Identidad y Seguridad",
    icon: "🛡️",
    description: "Domina AWS STS, usuarios IAM, roles y políticas de menor privilegio.",
    levelIds: ["lvl-1", "lvl-2", "lvl-3", "lvl-4"],
  },
  {
    id: "world-2",
    name: "Mundo 2: Almacenamiento Seguro S3",
    icon: "🪣",
    description: "Crea buckets en regiones específicas, bloquea acceso público y optimiza costes.",
    levelIds: ["lvl-5", "lvl-6", "lvl-7"],
  },
  {
    id: "world-3",
    name: "Mundo 3: Cómputo y Serverless",
    icon: "⚡",
    description: "Despliega instancias EC2, configura Security Groups y crea funciones AWS Lambda.",
    levelIds: ["lvl-8", "lvl-9", "lvl-10"],
  },
  {
    id: "world-4",
    name: "Mundo 4: Redes y CDN Global",
    icon: "🌐",
    description: "Diseña arquitecturas en Amazon VPC y distribuye a baja latencia con CloudFront.",
    levelIds: ["lvl-11", "lvl-12"],
  },
];

export const LEVELS: Level[] = [
  // LEVEL 1
  {
    id: "lvl-1",
    worldId: "world-1",
    number: 1,
    title: "Identidad en la Nube",
    service: "STS",
    story: "Acabas de recibir acceso al entorno de nube de la organización. Antes de operar, debes verificar tus credenciales y la cuenta activa.",
    explanation: "El servicio AWS STS (Security Token Service) permite obtener credenciales temporales y validar la identidad actual. El comando `aws sts get-caller-identity` devuelve el ID de cuenta de AWS, el ARN de identidad y el identificador único del usuario.",
    example: "aws sts get-caller-identity",
    mission: "Ejecuta el comando `aws sts get-caller-identity` para consultar la identidad de la sesión.",
    hint: "Usa exactamente `aws sts get-caller-identity`. No requiere parámetros adicionales.",
    starterCommand: "aws sts",
    rewards: { xp: 35, coins: 10 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws") {
        return { ok: false, stars: 0, message: "El comando debe comenzar con la CLI de 'aws'." };
      }
      if (p.service !== "sts") {
        return { ok: false, stars: 0, message: "El servicio a consultar es 'sts' (Security Token Service)." };
      }
      if (p.operation !== "get-caller-identity") {
        return { ok: false, stars: 0, message: "La operación requerida es 'get-caller-identity'." };
      }
      const output = JSON.stringify(
        {
          UserId: "AIDAJ456EXAMPLEDEV01",
          Account: "123456789012",
          Arn: "arn:aws:iam::123456789012:user/admin-cloud",
        },
        null,
        2
      );
      return {
        ok: true,
        stars: 3,
        message: "¡Identidad verificada con éxito! Operas como 'admin-cloud' en la cuenta 123456789012.",
        simulatedOutput: output,
      };
    },
  },

  // LEVEL 2
  {
    id: "lvl-2",
    worldId: "world-1",
    number: 2,
    title: "Creación de Usuarios IAM",
    service: "IAM",
    story: "Una nueva ingeniera, Alicia, se incorpora al equipo. En AWS nunca se comparten contraseñas ni la cuenta raíz; cada persona necesita su usuario individual.",
    explanation: "AWS IAM (Identity and Access Management) gestiona identidades y accesos. Con `aws iam create-user --user-name <nombre>` se da de alta un nuevo usuario dentro de la cuenta.",
    example: "aws iam create-user --user-name dev-carlos",
    mission: "Crea un usuario IAM llamado 'dev-alice' usando la opción `--user-name`.",
    hint: "El comando es: `aws iam create-user --user-name dev-alice`.",
    starterCommand: "aws iam create-user --user-name",
    rewards: { xp: 45, coins: 15 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "iam") {
        return { ok: false, stars: 0, message: "Utiliza la CLI de AWS con el servicio 'iam'." };
      }
      if (p.operation !== "create-user") {
        return { ok: false, stars: 0, message: "La operación debe ser 'create-user'." };
      }
      const user = p.options["user-name"];
      if (!user) {
        return { ok: false, stars: 0, message: "Falta el parámetro obligatorio '--user-name'." };
      }
      if (user !== "dev-alice") {
        return { ok: false, stars: 0, message: `El usuario solicitado es 'dev-alice', pero indicaste '${user}'.` };
      }
      const output = JSON.stringify(
        {
          User: {
            Path: "/",
            UserName: "dev-alice",
            UserId: "AIDA54321EXAMPLEALICE",
            Arn: "arn:aws:iam::123456789012:user/dev-alice",
            CreateDate: new Date().toISOString(),
          },
        },
        null,
        2
      );
      return {
        ok: true,
        stars: 3,
        message: "¡Usuario 'dev-alice' creado con éxito en IAM!",
        simulatedOutput: output,
      };
    },
  },

  // LEVEL 3
  {
    id: "lvl-3",
    worldId: "world-1",
    number: 3,
    title: "Roles de Ejecución para Servicios",
    service: "IAM",
    story: "Nuestras funciones serverless necesitan interactuar con otros servicios. En lugar de almacenar claves API en código, asignamos un Rol de IAM que confía en el servicio Lambda.",
    explanation: "Con `aws iam create-role --role-name <nombre> --assume-role-policy-document <documento>` se crea una entidad de rol con una política de relación de confianza (Trust Relationship).",
    example: "aws iam create-role --role-name MiRol --assume-role-policy-document file://trust.json",
    mission: "Crea el rol llamado 'LambdaExecutionRole' con el documento de política 'file://trust-policy.json'.",
    hint: "Escribe: `aws iam create-role --role-name LambdaExecutionRole --assume-role-policy-document file://trust-policy.json`.",
    starterCommand: "aws iam create-role --role-name LambdaExecutionRole",
    rewards: { xp: 55, coins: 20 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "iam") {
        return { ok: false, stars: 0, message: "Utiliza el servicio 'iam' de AWS." };
      }
      if (p.operation !== "create-role") {
        return { ok: false, stars: 0, message: "La operación debe ser 'create-role'." };
      }
      const role = p.options["role-name"];
      const policyDoc = p.options["assume-role-policy-document"];
      if (role !== "LambdaExecutionRole") {
        return { ok: false, stars: 0, message: "El rol debe llamarse exactamente '--role-name LambdaExecutionRole'." };
      }
      if (!policyDoc || (policyDoc !== "file://trust-policy.json" && policyDoc !== "file://trust.json")) {
        return {
          ok: false,
          stars: 0,
          message: "Debes especificar '--assume-role-policy-document file://trust-policy.json'.",
        };
      }
      const output = JSON.stringify(
        {
          Role: {
            Path: "/",
            RoleName: "LambdaExecutionRole",
            RoleId: "AROA12345EXAMPLELAMBDA",
            Arn: "arn:aws:iam::123456789012:role/LambdaExecutionRole",
            CreateDate: new Date().toISOString(),
            AssumeRolePolicyDocument: "%7B%22Version%22%3A%222012-10-17%22...%7D",
          },
        },
        null,
        2
      );
      return {
        ok: true,
        stars: 3,
        message: "¡Rol de ejecución 'LambdaExecutionRole' creado con su relación de confianza!",
        simulatedOutput: output,
      };
    },
  },

  // LEVEL 4
  {
    id: "lvl-4",
    worldId: "world-1",
    number: 4,
    title: "Políticas y Menor Privilegio",
    service: "IAM",
    story: "Alicia necesita auditar la configuración de la cuenta para detectar mejoras, pero no debe poder modificar ni borrar infraestructura.",
    explanation: "El comando `aws iam attach-user-policy --user-name <usuario> --policy-arn <arn>` vincula una política gestionada por AWS a un usuario. La política oficial de lectura global es `arn:aws:iam::aws:policy/ReadOnlyAccess`.",
    example: "aws iam attach-user-policy --user-name dev-bob --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess",
    mission: "Asigna la política gestionada 'arn:aws:iam::aws:policy/ReadOnlyAccess' al usuario 'dev-alice'.",
    hint: "Usa: `aws iam attach-user-policy --user-name dev-alice --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess`.",
    starterCommand: "aws iam attach-user-policy --user-name dev-alice",
    rewards: { xp: 60, coins: 20 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "iam") {
        return { ok: false, stars: 0, message: "Comando inválido. Usa 'aws iam'." };
      }
      if (p.operation !== "attach-user-policy") {
        return { ok: false, stars: 0, message: "La operación debe ser 'attach-user-policy'." };
      }
      if (p.options["user-name"] !== "dev-alice") {
        return { ok: false, stars: 0, message: "Falta o es incorrecto el parámetro '--user-name dev-alice'." };
      }
      if (p.options["policy-arn"] !== "arn:aws:iam::aws:policy/ReadOnlyAccess") {
        return {
          ok: false,
          stars: 0,
          message: "El ARN debe ser exactamente '--policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess'.",
        };
      }
      return {
        ok: true,
        stars: 3,
        message: "¡Política ReadOnlyAccess vinculada a 'dev-alice'! Principio de menor privilegio aplicado.",
        simulatedOutput: "# Política asociada correctamente (código de salida 0). Sin salida JSON requerida.",
      };
    },
  },

  // LEVEL 5
  {
    id: "lvl-5",
    worldId: "world-2",
    number: 5,
    title: "Crear un Bucket en la Región Correcta",
    service: "S3",
    story: "Vamos a almacenar los logs y registros del sistema. Los nombres de bucket en Amazon S3 tienen un espacio de nombres único mundial y se sitúan en una región específica.",
    explanation: "El comando de alto nivel `aws s3 mb s3://<nombre-bucket> --region <region>` ('make bucket') crea un nuevo depósito de almacenamiento de objetos.",
    example: "aws s3 mb s3://mi-empresa-app-assets --region eu-west-1",
    mission: "Crea el bucket 's3://empresa-logs-seguros' en la región 'eu-west-1'.",
    hint: "Escribe: `aws s3 mb s3://empresa-logs-seguros --region eu-west-1`.",
    starterCommand: "aws s3 mb s3://empresa-logs-seguros",
    rewards: { xp: 60, coins: 20 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "s3") {
        return { ok: false, stars: 0, message: "Usa la CLI con el servicio 's3'." };
      }
      if (p.operation !== "mb") {
        return { ok: false, stars: 0, message: "La operación para crear bucket es 'mb' (make bucket)." };
      }
      const target = p.positionals[0];
      if (target !== "s3://empresa-logs-seguros") {
        return {
          ok: false,
          stars: 0,
          message: "Debes indicar el URI del bucket como 's3://empresa-logs-seguros'.",
        };
      }
      if (p.options["region"] !== "eu-west-1") {
        return { ok: false, stars: 0, message: "Falta indicar la región correcta con '--region eu-west-1'." };
      }
      return {
        ok: true,
        stars: 3,
        message: "¡Bucket S3 creado satisfactoriamente en eu-west-1 (Irlanda)!",
        simulatedOutput: "make_bucket: empresa-logs-seguros",
      };
    },
  },

  // LEVEL 6
  {
    id: "lvl-6",
    worldId: "world-2",
    number: 6,
    title: "S3 Block Public Access",
    service: "S3",
    story: "Los incidentes de seguridad más habituales en la nube se deben a buckets públicos involuntarios. Debemos activar el cortafuegos de bloqueo público total.",
    explanation: "La llamada `aws s3api put-public-access-block` bloquea ACLs y directivas públicas. Recibe la configuración con cuatro flags activadas en true: BlockPublicAcls, IgnorePublicAcls, BlockPublicPolicy, RestrictPublicBuckets.",
    example: "aws s3api put-public-access-block --bucket mi-bucket --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true",
    mission: "Bloquea todo el acceso público en el bucket 'empresa-logs-seguros' mediante '--public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true'.",
    hint: "Usa `aws s3api put-public-access-block --bucket empresa-logs-seguros --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true`.",
    starterCommand: "aws s3api put-public-access-block --bucket empresa-logs-seguros",
    rewards: { xp: 70, coins: 25 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "s3api") {
        return { ok: false, stars: 0, message: "Para esta configuración avanzada se usa 'aws s3api'." };
      }
      if (p.operation !== "put-public-access-block") {
        return { ok: false, stars: 0, message: "La operación debe ser 'put-public-access-block'." };
      }
      if (p.options["bucket"] !== "empresa-logs-seguros") {
        return { ok: false, stars: 0, message: "Indica el bucket correcto: '--bucket empresa-logs-seguros'." };
      }
      const config = String(p.options["public-access-block-configuration"] ?? "");
      const hasBlockAcls = /BlockPublicAcls=true/i.test(config);
      const hasIgnoreAcls = /IgnorePublicAcls=true/i.test(config);
      const hasBlockPol = /BlockPublicPolicy=true/i.test(config);
      const hasRestrict = /RestrictPublicBuckets=true/i.test(config);
      if (!hasBlockAcls || !hasIgnoreAcls || !hasBlockPol || !hasRestrict) {
        return {
          ok: false,
          stars: 0,
          message: "La configuración debe contener las 4 opciones a true: BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true.",
        };
      }
      return {
        ok: true,
        stars: 3,
        message: "¡S3 Block Public Access activado al 100%! Tus datos están protegidos contra exposiciones.",
        simulatedOutput: "# S3 Public Access Block aplicado con éxito. Código de retorno 0.",
      };
    },
  },

  // LEVEL 7
  {
    id: "lvl-7",
    worldId: "world-2",
    number: 7,
    title: "Optimización de Costes con Storage Classes",
    service: "S3",
    story: "Vamos a subir un backup comprimido. Como no se consultará a diario, guardarlo en S3 Standard dispararía el coste. Usemos la clase de almacenamiento para acceso poco frecuente.",
    explanation: "El parámetro `--storage-class STANDARD_IA` en `aws s3 cp` permite almacenar datos con hasta un 50% de ahorro por gigabyte respecto a S3 Standard manteniendo milisegundos de tiempo de respuesta.",
    example: "aws s3 cp datos.zip s3://mi-bucket/datos.zip --storage-class STANDARD_IA",
    mission: "Copia 'backup.tar.gz' a 's3://empresa-logs-seguros/backup.tar.gz' con la clase de almacenamiento 'STANDARD_IA'.",
    hint: "El comando es: `aws s3 cp backup.tar.gz s3://empresa-logs-seguros/backup.tar.gz --storage-class STANDARD_IA`.",
    starterCommand: "aws s3 cp backup.tar.gz s3://empresa-logs-seguros/backup.tar.gz",
    rewards: { xp: 75, coins: 25 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "s3") {
        return { ok: false, stars: 0, message: "Comando inválido. Usa 'aws s3'." };
      }
      if (p.operation !== "cp") {
        return { ok: false, stars: 0, message: "La operación para copiar objetos es 'cp'." };
      }
      if (p.positionals[0] !== "backup.tar.gz") {
        return { ok: false, stars: 0, message: "El archivo origen debe ser 'backup.tar.gz'." };
      }
      if (p.positionals[1] !== "s3://empresa-logs-seguros/backup.tar.gz") {
        return {
          ok: false,
          stars: 0,
          message: "El destino debe ser 's3://empresa-logs-seguros/backup.tar.gz'.",
        };
      }
      if (p.options["storage-class"] !== "STANDARD_IA") {
        return {
          ok: false,
          stars: 0,
          message: "Especifica la clase de almacenamiento con '--storage-class STANDARD_IA'.",
        };
      }
      return {
        ok: true,
        stars: 3,
        message: "¡Copia completada con clase STANDARD_IA! Almacenamiento duradero y coste optimizado.",
        simulatedOutput: "upload: ./backup.tar.gz to s3://empresa-logs-seguros/backup.tar.gz (StorageClass: STANDARD_IA)",
      };
    },
  },

  // LEVEL 8
  {
    id: "lvl-8",
    worldId: "world-3",
    number: 8,
    title: "Lanzamiento de Máquinas Virtuales EC2",
    service: "EC2",
    story: "Necesitamos desplegar un microservicio de backend en una máquina virtual de Amazon EC2 con arranque elástico.",
    explanation: "El comando `aws ec2 run-instances` provisiona servidores virtuales. Requiere `--image-id` (Amazon Machine Image), `--instance-type` (dimensionamiento de CPU y RAM) y `--key-name` para conectividad SSH.",
    example: "aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t3.micro --key-name mi-clave-ssh",
    mission: "Lanza una instancia con `--image-id ami-0c55b159cbfafe1f0`, `--instance-type t3.micro` y `--key-name cloud-key`.",
    hint: "Escribe: `aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t3.micro --key-name cloud-key`.",
    starterCommand: "aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0",
    rewards: { xp: 80, coins: 30 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "ec2") {
        return { ok: false, stars: 0, message: "Utiliza la CLI de AWS con el servicio 'ec2'." };
      }
      if (p.operation !== "run-instances") {
        return { ok: false, stars: 0, message: "La operación debe ser 'run-instances'." };
      }
      if (p.options["image-id"] !== "ami-0c55b159cbfafe1f0") {
        return { ok: false, stars: 0, message: "Debes especificar '--image-id ami-0c55b159cbfafe1f0'." };
      }
      if (p.options["instance-type"] !== "t3.micro") {
        return { ok: false, stars: 0, message: "Debes indicar '--instance-type t3.micro'." };
      }
      if (p.options["key-name"] !== "cloud-key") {
        return { ok: false, stars: 0, message: "Falta o es incorrecto '--key-name cloud-key'." };
      }
      const output = JSON.stringify(
        {
          Instances: [
            {
              InstanceId: "i-0a1b2c3d4e5f67890",
              ImageId: "ami-0c55b159cbfafe1f0",
              InstanceType: "t3.micro",
              KeyName: "cloud-key",
              State: { Code: 0, Name: "pending" },
              PrivateIpAddress: "10.0.1.45",
              Architecture: "x86_64",
            },
          ],
        },
        null,
        2
      );
      return {
        ok: true,
        stars: 3,
        message: "¡Instancia EC2 i-0a1b2c3d4e5f67890 aprovisionada e iniciando!",
        simulatedOutput: output,
      };
    },
  },

  // LEVEL 9
  {
    id: "lvl-9",
    worldId: "world-3",
    number: 9,
    title: "Cortafuegos con Security Groups",
    service: "EC2",
    story: "Nuestra máquina virtual tiene el puerto web HTTPS cerrado por defecto. Debemos autorizar tráfico entrante seguro.",
    explanation: "Los Security Groups operan como firewalls virtuales a nivel de tarjeta de red con seguimiento de estado (stateful). Con `aws ec2 authorize-security-group-ingress` añadimos reglas de entrada definiendo protocolo, puerto y bloque CIDR.",
    example: "aws ec2 authorize-security-group-ingress --group-id sg-0123456789abcdef0 --protocol tcp --port 80 --cidr 0.0.0.0/0",
    mission: "Autoriza tráfico TCP entrante en el puerto 443 desde cualquier IP (0.0.0.0/0) en el grupo 'sg-0123456789abcdef0'.",
    hint: "El comando es: `aws ec2 authorize-security-group-ingress --group-id sg-0123456789abcdef0 --protocol tcp --port 443 --cidr 0.0.0.0/0`.",
    starterCommand: "aws ec2 authorize-security-group-ingress --group-id sg-0123456789abcdef0",
    rewards: { xp: 85, coins: 30 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "ec2") {
        return { ok: false, stars: 0, message: "Comando incorrecto. Usa 'aws ec2'." };
      }
      if (p.operation !== "authorize-security-group-ingress") {
        return { ok: false, stars: 0, message: "La operación requerida es 'authorize-security-group-ingress'." };
      }
      if (p.options["group-id"] !== "sg-0123456789abcdef0") {
        return { ok: false, stars: 0, message: "El grupo debe ser '--group-id sg-0123456789abcdef0'." };
      }
      if (String(p.options["protocol"]).toLowerCase() !== "tcp") {
        return { ok: false, stars: 0, message: "El protocolo debe ser '--protocol tcp'." };
      }
      if (String(p.options["port"]) !== "443") {
        return { ok: false, stars: 0, message: "El puerto HTTPS debe ser '--port 443'." };
      }
      if (p.options["cidr"] !== "0.0.0.0/0") {
        return { ok: false, stars: 0, message: "El rango de red debe ser '--cidr 0.0.0.0/0'." };
      }
      const output = JSON.stringify(
        {
          Return: true,
          SecurityGroupRuleId: "sgr-01a2b3c4d5e6f7g8h",
        },
        null,
        2
      );
      return {
        ok: true,
        stars: 3,
        message: "¡Regla de firewall autorizada! Tu servidor ya puede recibir conexiones HTTPS seguras.",
        simulatedOutput: output,
      };
    },
  },

  // LEVEL 10
  {
    id: "lvl-10",
    worldId: "world-3",
    number: 10,
    title: "Arquitectura Serverless con AWS Lambda",
    service: "Lambda",
    story: "Queremos procesar pedidos bajo demanda sin pagar por servidores inactivos. Crearemos una función Lambda que solo factura cuando ejecuta código.",
    explanation: "`aws lambda create-function` empaqueta y publica funciones serverless con su runtime (nodejs, python...), rol de ejecución IAM y código comprimido en zip.",
    example: "aws lambda create-function --function-name mi-fn --runtime nodejs20.x --role arn:aws:iam::123456789012:role/MiRol --handler index.handler --zip-file fileb://code.zip",
    mission: "Crea la función 'procesar-pedidos' con `--runtime nodejs20.x`, rol 'arn:aws:iam::123456789012:role/LambdaExecutionRole', handler 'index.handler' y código 'fileb://function.zip'.",
    hint: "Escribe: `aws lambda create-function --function-name procesar-pedidos --runtime nodejs20.x --role arn:aws:iam::123456789012:role/LambdaExecutionRole --handler index.handler --zip-file fileb://function.zip`.",
    starterCommand: "aws lambda create-function --function-name procesar-pedidos",
    rewards: { xp: 95, coins: 35 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "lambda") {
        return { ok: false, stars: 0, message: "Usa la CLI de AWS con el servicio 'lambda'." };
      }
      if (p.operation !== "create-function") {
        return { ok: false, stars: 0, message: "La operación es 'create-function'." };
      }
      if (p.options["function-name"] !== "procesar-pedidos") {
        return { ok: false, stars: 0, message: "El nombre debe ser '--function-name procesar-pedidos'." };
      }
      if (p.options["runtime"] !== "nodejs20.x") {
        return { ok: false, stars: 0, message: "El runtime debe ser '--runtime nodejs20.x'." };
      }
      if (p.options["role"] !== "arn:aws:iam::123456789012:role/LambdaExecutionRole") {
        return {
          ok: false,
          stars: 0,
          message: "El rol de ejecución debe ser '--role arn:aws:iam::123456789012:role/LambdaExecutionRole'.",
        };
      }
      if (p.options["handler"] !== "index.handler") {
        return { ok: false, stars: 0, message: "El handler debe ser '--handler index.handler'." };
      }
      if (p.options["zip-file"] !== "fileb://function.zip") {
        return { ok: false, stars: 0, message: "El archivo zip debe indicarse como '--zip-file fileb://function.zip'." };
      }
      const output = JSON.stringify(
        {
          FunctionName: "procesar-pedidos",
          FunctionArn: "arn:aws:lambda:eu-west-1:123456789012:function:procesar-pedidos",
          Runtime: "nodejs20.x",
          Role: "arn:aws:iam::123456789012:role/LambdaExecutionRole",
          Handler: "index.handler",
          CodeSize: 10485,
          Description: "Función de procesamiento de pedidos Serverless",
          Timeout: 3,
          MemorySize: 128,
          LastModified: new Date().toISOString(),
          State: "Active",
        },
        null,
        2
      );
      return {
        ok: true,
        stars: 3,
        message: "¡Función Lambda 'procesar-pedidos' desplegada y lista para ser invocada!",
        simulatedOutput: output,
      };
    },
  },

  // LEVEL 11
  {
    id: "lvl-11",
    worldId: "world-4",
    number: 11,
    title: "Aislamiento de Red con Amazon VPC",
    service: "VPC",
    story: "Para garantizar la seguridad empresarial, todos los recursos deben vivir dentro de una red virtual privada dedicada y aislada del resto de clientes.",
    explanation: "Amazon VPC (Virtual Private Cloud) permite provisionar una sección lógicamente aislada de la nube de AWS. El comando `aws ec2 create-vpc --cidr-block <bloque>` define el rango de direcciones IP privadas disponibles.",
    example: "aws ec2 create-vpc --cidr-block 172.16.0.0/16",
    mission: "Crea una nueva VPC con el bloque de direcciones CIDR '10.0.0.0/16'.",
    hint: "El comando es: `aws ec2 create-vpc --cidr-block 10.0.0.0/16`.",
    starterCommand: "aws ec2 create-vpc --cidr-block",
    rewards: { xp: 100, coins: 40 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "ec2") {
        return { ok: false, stars: 0, message: "Las redes VPC se gestionan mediante 'aws ec2'." };
      }
      if (p.operation !== "create-vpc") {
        return { ok: false, stars: 0, message: "La operación para crear una red privada es 'create-vpc'." };
      }
      if (p.options["cidr-block"] !== "10.0.0.0/16") {
        return { ok: false, stars: 0, message: "Debes especificar el rango '--cidr-block 10.0.0.0/16'." };
      }
      const output = JSON.stringify(
        {
          Vpc: {
            CidrBlock: "10.0.0.0/16",
            DhcpOptionsId: "dopt-12345678",
            State: "pending",
            VpcId: "vpc-0987654321fedcba0",
            OwnerId: "123456789012",
            InstanceTenancy: "default",
          },
        },
        null,
        2
      );
      return {
        ok: true,
        stars: 3,
        message: "¡VPC 'vpc-0987654321fedcba0' creada con éxito! Rango 10.0.0.0/16 (65,536 IPs).",
        simulatedOutput: output,
      };
    },
  },

  // LEVEL 12
  {
    id: "lvl-12",
    worldId: "world-4",
    number: 12,
    title: "Aceleración y CDN con Amazon CloudFront",
    service: "CloudFront",
    story: "Nuestra aplicación atiende tráfico internacional. Para evitar retrasos geográficos, desplegaremos una red de distribución de contenidos en más de 400 Edge Locations.",
    explanation: "Amazon CloudFront entrega contenido estático y dinámico con baja latencia y alta velocidad de transferencia. Con `aws cloudfront create-distribution --origin-domain-name <dominio> --default-root-object <archivo>` se configura la distribución perimetral.",
    example: "aws cloudfront create-distribution --origin-domain-name mi-web.s3.amazonaws.com --default-root-object index.html",
    mission: "Crea una distribución para el origen 'empresa-logs-seguros.s3.amazonaws.com' con objeto raíz 'index.html'.",
    hint: "Escribe: `aws cloudfront create-distribution --origin-domain-name empresa-logs-seguros.s3.amazonaws.com --default-root-object index.html`.",
    starterCommand: "aws cloudfront create-distribution --origin-domain-name empresa-logs-seguros.s3.amazonaws.com",
    rewards: { xp: 120, coins: 50 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "cloudfront") {
        return { ok: false, stars: 0, message: "Utiliza la CLI de AWS con el servicio 'cloudfront'." };
      }
      if (p.operation !== "create-distribution") {
        return { ok: false, stars: 0, message: "La operación requerida es 'create-distribution'." };
      }
      if (p.options["origin-domain-name"] !== "empresa-logs-seguros.s3.amazonaws.com") {
        return {
          ok: false,
          stars: 0,
          message: "El origen debe ser '--origin-domain-name empresa-logs-seguros.s3.amazonaws.com'.",
        };
      }
      if (p.options["default-root-object"] !== "index.html") {
        return {
          ok: false,
          stars: 0,
          message: "Falta configurar '--default-root-object index.html'.",
        };
      }
      const output = JSON.stringify(
        {
          Distribution: {
            Id: "EDFDVBD632BHDS5",
            Status: "InProgress",
            DomainName: "d111111abcdef8.cloudfront.net",
            DistributionConfig: {
              Origins: {
                Quantity: 1,
                Items: [{ DomainName: "empresa-logs-seguros.s3.amazonaws.com", Id: "S3-empresa-logs-seguros" }],
              },
              DefaultRootObject: "index.html",
              Enabled: true,
            },
          },
        },
        null,
        2
      );
      return {
        ok: true,
        stars: 3,
        message: "¡Distribución CloudFront creada! Tu contenido ahora se almacena en caché en el Edge mundial.",
        simulatedOutput: output,
      };
    },
  },
];
