import { parseAwsCommand } from "./cliParser";
import type { Level, ValidationResult, World } from "./types";

export const WORLDS: World[] = [
  {
    id: "world-1",
    name: "Dominio 1: Conceptos Cloud (24%)",
    icon: "🌐",
    description: "Infraestructura global (Regiones, AZs, Edge), ventajas del Cloud y Modelo de Responsabilidad Compartida.",
    levelIds: ["lvl-1", "lvl-2", "lvl-3"],
  },
  {
    id: "world-2",
    name: "Dominio 2: Seguridad & IAM (30%)",
    icon: "🛡️",
    description: "Principio de menor privilegio, usuarios, roles de servicio, políticas y protección de datos en S3.",
    levelIds: ["lvl-4", "lvl-5", "lvl-6", "lvl-7"],
  },
  {
    id: "world-3",
    name: "Dominio 3: Tecnología & Servicios (34%)",
    icon: "⚡",
    description: "Cómputo elástico (EC2, Lambda), redes privadas (VPC) y cortafuegos virtuales (Security Groups).",
    levelIds: ["lvl-8", "lvl-9", "lvl-10", "lvl-11"],
  },
  {
    id: "world-4",
    name: "Dominio 4: Costes & Arquitectura (12%)",
    icon: "💰",
    description: "Optimización de costes, clases de almacenamiento S3 y pilares del AWS Well-Architected Framework.",
    levelIds: ["lvl-12"],
  },
];

export const LEVELS: Level[] = [
  // LEVEL 1: Dominio 1 - Regiones y AZs
  {
    id: "lvl-1",
    worldId: "world-1",
    number: 1,
    title: "Regiones y Zonas de Disponibilidad (AZ)",
    service: "EC2 / Infraestructura",
    certification: "AWS Cloud Practitioner (CLF-C02)",
    domain: "Dominio 1: Conceptos Cloud",
    story: "Una empresa multinacional quiere desplegar una aplicación web con tolerancia a fallos. Para el examen CLF-C02, debes comprender que una Región de AWS es una ubicación geográfica física aislada que contiene múltiples Zonas de Disponibilidad (AZs), cada una compuesta por uno o más centros de datos discretos e independientes.",
    explanation: "Cada Región de AWS tiene al menos 3 Zonas de Disponibilidad conectadas mediante redes privadas de fibra óptica de latencia ultrabaja. Desplegar en más de una AZ garantiza Alta Disponibilidad (High Availability) frente a desastres físicos en un data center.",
    examTip: "¡Pregunta fija de examen! Una Zona de Disponibilidad (ej: eu-west-1a) NO es un único data center; puede constar de varios centros de datos. Desplegar en 'Multi-AZ' protege ante fallos de hardware o energía.",
    example: "aws ec2 describe-availability-zones --region eu-west-1",
    mission: "Consulta las Zonas de Disponibilidad de la región europea de Irlanda ejecutando `aws ec2 describe-availability-zones --region eu-west-1`.",
    hint: "El comando exacto es: `aws ec2 describe-availability-zones --region eu-west-1`.",
    starterCommand: "aws ec2 describe-availability-zones --region",
    rewards: { xp: 35, coins: 10 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "ec2") {
        return { ok: false, stars: 0, message: "El comando debe comenzar por 'aws ec2'." };
      }
      if (p.operation !== "describe-availability-zones") {
        return { ok: false, stars: 0, message: "La operación oficial es 'describe-availability-zones'." };
      }
      if (p.options["region"] !== "eu-west-1") {
        return { ok: false, stars: 0, message: "Debes especificar la región de Irlanda: '--region eu-west-1'." };
      }
      const output = JSON.stringify(
        {
          AvailabilityZones: [
            { State: "available", OptInStatus: "opt-in-not-required", RegionName: "eu-west-1", ZoneName: "eu-west-1a", ZoneId: "euw1-az1" },
            { State: "available", OptInStatus: "opt-in-not-required", RegionName: "eu-west-1", ZoneName: "eu-west-1b", ZoneId: "euw1-az2" },
            { State: "available", OptInStatus: "opt-in-not-required", RegionName: "eu-west-1", ZoneName: "eu-west-1c", ZoneId: "euw1-az3" },
          ],
        },
        null,
        2
      );
      return {
        ok: true,
        stars: 3,
        message: "¡Zonas de Disponibilidad consultadas! eu-west-1 cuenta con 3 AZs redundantes (eu-west-1a, 1b, 1c).",
        simulatedOutput: output,
      };
    },
  },

  // LEVEL 2: Dominio 1 - Edge Locations & CloudFront
  {
    id: "lvl-2",
    worldId: "world-1",
    number: 2,
    title: "Puntos de Presencia: Edge Locations",
    service: "CloudFront",
    certification: "AWS Cloud Practitioner (CLF-C02)",
    domain: "Dominio 1: Conceptos Cloud",
    story: "Nuestros usuarios se quejan de lentitud cuando acceden desde Tokio o Sydney porque los servidores centrales están en Europa. En la arquitectura de AWS, las Edge Locations (más de 450 en todo el mundo) entregan contenido en caché a milisegundos de distancia de cada usuario.",
    explanation: "Amazon CloudFront es la Red de Entrega de Contenido (CDN) global de AWS. Utiliza las Edge Locations para almacenar copias en caché de vídeos, imágenes y páginas, aliviando la carga del servidor de origen y reduciendo drásticamente los tiempos de carga.",
    examTip: "En el examen: Las Edge Locations NO ejecutan cargas completas de cómputo tradicional; se usan para caché con CloudFront, DNS con Route 53 y protección perimetral con AWS WAF y AWS Shield.",
    example: "aws cloudfront list-distributions",
    mission: "Lista las distribuciones de CloudFront configuradas en la infraestructura global con `aws cloudfront list-distributions`.",
    hint: "Escribe: `aws cloudfront list-distributions`.",
    starterCommand: "aws cloudfront list-distributions",
    rewards: { xp: 45, coins: 15 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "cloudfront") {
        return { ok: false, stars: 0, message: "El servicio a consultar es 'aws cloudfront'." };
      }
      if (p.operation !== "list-distributions") {
        return { ok: false, stars: 0, message: "La llamada requerida es 'list-distributions'." };
      }
      const output = JSON.stringify(
        {
          DistributionList: {
            Items: [
              {
                Id: "E2F123EXAMPLE",
                ARN: "arn:aws:cloudfront::123456789012:distribution/E2F123EXAMPLE",
                Status: "Deployed",
                DomainName: "d1234abcd.cloudfront.net",
                Aliases: { Quantity: 1, Items: ["app.mi-empresa.com"] },
                Origins: { Quantity: 1, Items: [{ Id: "S3-origen-assets", DomainName: "empresa-assets.s3.amazonaws.com" }] },
                Enabled: true,
              },
            ],
            Quantity: 1,
          },
        },
        null,
        2
      );
      return {
        ok: true,
        stars: 3,
        message: "¡Distribución CloudFront verificada! Contenido entregado en el Edge de baja latencia.",
        simulatedOutput: output,
      };
    },
  },

  // LEVEL 3: Dominio 1 - Modelo de Responsabilidad Compartida
  {
    id: "lvl-3",
    worldId: "world-1",
    number: 3,
    title: "Modelo de Responsabilidad Compartida",
    service: "STS / Seguridad",
    certification: "AWS Cloud Practitioner (CLF-C02)",
    domain: "Dominio 1: Conceptos Cloud",
    story: "Uno de los temas más evaluados en el examen Cloud Practitioner es la división de responsabilidades de seguridad: ¿de qué es responsable AWS y de qué eres responsable tú?",
    explanation: "AWS es responsable de la 'Seguridad DE la nube' (infraestructura física, hardware, centros de datos, red subyacente y software de virtualización). El Cliente es responsable de la 'Seguridad EN la nube' (gestión de identidades con IAM, datos de clientes, sistemas operativos de EC2, parches y firewalls). Para operar con seguridad, verificamos la identidad activa de nuestra sesión con AWS STS.",
    examTip: "Regla mnemotécnica de certificación: Si se puede tocar físicamente (racks, generadores diésel, cables), es de AWS. Si es configuración lógica (IAM, contraseñas, cifrado, puertos de red), es del cliente.",
    example: "aws sts get-caller-identity",
    mission: "Verifica tu sesión e identidad activa en la cuenta ejecutando `aws sts get-caller-identity`.",
    hint: "El comando es: `aws sts get-caller-identity`.",
    starterCommand: "aws sts get-caller-identity",
    rewards: { xp: 50, coins: 15 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "sts") {
        return { ok: false, stars: 0, message: "Utiliza la CLI con el servicio 'aws sts'." };
      }
      if (p.operation !== "get-caller-identity") {
        return { ok: false, stars: 0, message: "La llamada requerida es 'get-caller-identity'." };
      }
      const output = JSON.stringify(
        {
          UserId: "AROA54321EXAMPLEPRACTITIONER",
          Account: "123456789012",
          Arn: "arn:aws:iam::123456789012:user/cloud-practitioner",
        },
        null,
        2
      );
      return {
        ok: true,
        stars: 3,
        message: "¡Identidad verificada! Principio de responsabilidad del cliente en IAM aplicado con éxito.",
        simulatedOutput: output,
      };
    },
  },

  // LEVEL 4: Dominio 2 - IAM Usuarios & Menor Privilegio
  {
    id: "lvl-4",
    worldId: "world-2",
    number: 4,
    title: "IAM: Menor Privilegio y Usuarios",
    service: "IAM",
    certification: "AWS Cloud Practitioner (CLF-C02)",
    domain: "Dominio 2: Seguridad & IAM",
    story: "Siguiendo las mejores prácticas de seguridad de AWS, NUNCA debemos utilizar el usuario raíz (Root User) para las operaciones del día a día. Debemos crear identidades individuales en AWS IAM y habilitar autenticación multifactor (MFA).",
    explanation: "AWS IAM (Identity and Access Management) permite administrar de forma segura el acceso a los servicios y recursos de AWS. Cada miembro del equipo debe contar con su propio usuario y recibir únicamente los permisos mínimos necesarios para su función.",
    examTip: "En el examen: El usuario Root solo debe utilizarse para tareas muy puntuales (cambiar el plan de soporte, cerrar la cuenta, o recuperar acceso root perdido). Para todo lo demás: usuarios o roles de IAM.",
    example: "aws iam create-user --user-name dev-carlos",
    mission: "Crea un usuario de IAM llamado 'dev-alice' con la opción `--user-name dev-alice`.",
    hint: "Escribe: `aws iam create-user --user-name dev-alice`.",
    starterCommand: "aws iam create-user --user-name",
    rewards: { xp: 55, coins: 20 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "iam") {
        return { ok: false, stars: 0, message: "El servicio a utilizar es 'aws iam'." };
      }
      if (p.operation !== "create-user") {
        return { ok: false, stars: 0, message: "La operación debe ser 'create-user'." };
      }
      if (p.options["user-name"] !== "dev-alice") {
        return { ok: false, stars: 0, message: "Falta o es incorrecto '--user-name dev-alice'." };
      }
      const output = JSON.stringify(
        {
          User: {
            Path: "/",
            UserName: "dev-alice",
            UserId: "AIDA12345EXAMPLEALICE",
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
        message: "¡Usuario 'dev-alice' creado en IAM! Práctica recomendada de no usar el usuario root.",
        simulatedOutput: output,
      };
    },
  },

  // LEVEL 5: Dominio 2 - Roles de IAM
  {
    id: "lvl-5",
    worldId: "world-2",
    number: 5,
    title: "Roles de IAM para Servicios",
    service: "IAM",
    certification: "AWS Cloud Practitioner (CLF-C02)",
    domain: "Dominio 2: Seguridad & IAM",
    story: "Una aplicación alojada en AWS necesita acceder a un bucket de S3 o base de datos. Una práctica de seguridad pésima sería incrustar claves de acceso en el código fuente. La solución oficial de AWS son los Roles de IAM.",
    explanation: "Un Rol de IAM proporciona credenciales de seguridad temporales y de rotación automática mediante AWS STS. Se le asigna una política de confianza (Trust Policy) que autoriza al servicio (por ejemplo, AWS Lambda o EC2) a asumir el rol.",
    examTip: "Diferencia de examen: Un Usuario tiene credenciales permanentes (contraseña / access key). Un Rol NO tiene credenciales fijas; es asumido por entidades o servicios de forma temporal.",
    example: "aws iam create-role --role-name MiRolServicio --assume-role-policy-document file://trust-policy.json",
    mission: "Crea el rol 'LambdaExecutionRole' con la política de confianza 'file://trust-policy.json'.",
    hint: "El comando es: `aws iam create-role --role-name LambdaExecutionRole --assume-role-policy-document file://trust-policy.json`.",
    starterCommand: "aws iam create-role --role-name LambdaExecutionRole",
    rewards: { xp: 60, coins: 20 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "iam") {
        return { ok: false, stars: 0, message: "Usa el servicio 'aws iam'." };
      }
      if (p.operation !== "create-role") {
        return { ok: false, stars: 0, message: "La operación debe ser 'create-role'." };
      }
      if (p.options["role-name"] !== "LambdaExecutionRole") {
        return { ok: false, stars: 0, message: "El rol debe llamarse exactamente '--role-name LambdaExecutionRole'." };
      }
      const policyDoc = p.options["assume-role-policy-document"];
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
            RoleName: "LambdaExecutionRole",
            RoleId: "AROA112233EXAMPLE",
            Arn: "arn:aws:iam::123456789012:role/LambdaExecutionRole",
            CreateDate: new Date().toISOString(),
          },
        },
        null,
        2
      );
      return {
        ok: true,
        stars: 3,
        message: "¡Rol de ejecución creado! Tus servicios obtendrán credenciales temporales automáticas.",
        simulatedOutput: output,
      };
    },
  },

  // LEVEL 6: Dominio 2 - Políticas Gestionadas y Menor Privilegio
  {
    id: "lvl-6",
    worldId: "world-2",
    number: 6,
    title: "Políticas Gestionadas de Menor Privilegio",
    service: "IAM",
    certification: "AWS Cloud Practitioner (CLF-C02)",
    domain: "Dominio 2: Seguridad & IAM",
    story: "Alicia necesita auditar los servicios y recursos de la nube pero jamás debe tener permisos para modificar, apagar o borrar nada. Aplicaremos el principio de menor privilegio con una directiva gestionada por AWS.",
    explanation: "Las políticas administradas de AWS son directivas creadas y mantenidas por AWS para casos de uso comunes. `ReadOnlyAccess` concede acceso de solo lectura a todos los servicios de AWS sin permisos de modificación.",
    examTip: "Pregunta clásica: ¿Qué política otorga acceso total de administración? `AdministratorAccess`. ¿Qué política concede solo permisos de consulta? `ReadOnlyAccess`. ¿Cuál sigue el principio de menor privilegio? La más restrictiva que permita completar la tarea.",
    example: "aws iam attach-user-policy --user-name dev-alice --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess",
    mission: "Asigna la política 'arn:aws:iam::aws:policy/ReadOnlyAccess' al usuario 'dev-alice'.",
    hint: "Escribe: `aws iam attach-user-policy --user-name dev-alice --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess`.",
    starterCommand: "aws iam attach-user-policy --user-name dev-alice",
    rewards: { xp: 65, coins: 25 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "iam") {
        return { ok: false, stars: 0, message: "Comando inválido. Usa 'aws iam'." };
      }
      if (p.operation !== "attach-user-policy") {
        return { ok: false, stars: 0, message: "La llamada requerida es 'attach-user-policy'." };
      }
      if (p.options["user-name"] !== "dev-alice") {
        return { ok: false, stars: 0, message: "Indica el usuario con '--user-name dev-alice'." };
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
        message: "¡Política ReadOnlyAccess vinculada! Privilegios mínimos estrictos concedidos.",
        simulatedOutput: "# Política asociada con éxito (código de retorno 0). Sin cuerpo JSON requerido.",
      };
    },
  },

  // LEVEL 7: Dominio 2 - S3 Block Public Access
  {
    id: "lvl-7",
    worldId: "world-2",
    number: 7,
    title: "Protección de Almacenamiento: S3 Block Public Access",
    service: "S3",
    certification: "AWS Cloud Practitioner (CLF-C02)",
    domain: "Dominio 2: Seguridad & IAM",
    story: "La filtración de datos más común en la nube ocurre por configurar buckets de S3 como públicos sin darse cuenta. AWS proporciona una capa centralizada de cortafuegos de almacenamiento: S3 Block Public Access.",
    explanation: "S3 Block Public Access bloquea el acceso público a través de ACLs y directivas de bucket en 4 configuraciones: BlockPublicAcls, IgnorePublicAcls, BlockPublicPolicy y RestrictPublicBuckets.",
    examTip: "Para el examen: Por defecto, todos los nuevos buckets de Amazon S3 tienen el Bloqueo de Acceso Público activado. Desactivarlo requiere privilegios de administrador explícitos.",
    example: "aws s3api put-public-access-block --bucket mi-bucket --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true",
    mission: "Bloquea todo el acceso público en el bucket 'empresa-datos-seguros' con las 4 banderas a true.",
    hint: "El comando es: `aws s3api put-public-access-block --bucket empresa-datos-seguros --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true`.",
    starterCommand: "aws s3api put-public-access-block --bucket empresa-datos-seguros",
    rewards: { xp: 70, coins: 25 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "s3api") {
        return { ok: false, stars: 0, message: "Para esta gestión avanzada se usa 'aws s3api'." };
      }
      if (p.operation !== "put-public-access-block") {
        return { ok: false, stars: 0, message: "La llamada debe ser 'put-public-access-block'." };
      }
      if (p.options["bucket"] !== "empresa-datos-seguros" && p.options["bucket"] !== "empresa-logs-seguros") {
        return { ok: false, stars: 0, message: "Indica el bucket '--bucket empresa-datos-seguros'." };
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
          message: "La configuración debe contener: BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true.",
        };
      }
      return {
        ok: true,
        stars: 3,
        message: "¡S3 Block Public Access aplicado al 100%! Datos totalmente protegidos contra internet.",
        simulatedOutput: "# S3 Public Access Block activado con código 0.",
      };
    },
  },

  // LEVEL 8: Dominio 3 - EC2 y Modelos de Compra
  {
    id: "lvl-8",
    worldId: "world-3",
    number: 8,
    title: "Cómputo Elástico: Amazon EC2",
    service: "EC2",
    certification: "AWS Cloud Practitioner (CLF-C02)",
    domain: "Dominio 3: Tecnología & Servicios Core",
    story: "Amazon EC2 (Elastic Compute Cloud) es el servicio de servidores virtuales escalables de AWS. Un concepto clave en la certificación son los modelos de compra de EC2.",
    explanation: "Los modelos de compra principales son: 1) On-Demand (pago por segundo sin compromiso para cargas impredecibles), 2) Savings Plans / Reserved Instances (descuentos de hasta el 72% comprometiéndose a 1 o 3 años), y 3) Spot Instances (hasta 90% de descuento aprovechando capacidad sobrante de AWS, ideal para cargas tolerantes a interrupciones).",
    examTip: "¿Qué modelo de compra elegirías para una carga de trabajo constante durante 3 años? Savings Plans o Reserved Instances. ¿Para procesar lotes nocturnos que pueden reiniciarse? Spot Instances.",
    example: "aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t3.micro --key-name cloud-key",
    mission: "Lanza una instancia con `--image-id ami-0c55b159cbfafe1f0`, tamaño `--instance-type t3.micro` y clave SSH `--key-name cloud-key`.",
    hint: "Usa: `aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t3.micro --key-name cloud-key`.",
    starterCommand: "aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0",
    rewards: { xp: 80, coins: 30 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "ec2") {
        return { ok: false, stars: 0, message: "Utiliza 'aws ec2'." };
      }
      if (p.operation !== "run-instances") {
        return { ok: false, stars: 0, message: "La llamada para crear instancias es 'run-instances'." };
      }
      if (p.options["image-id"] !== "ami-0c55b159cbfafe1f0") {
        return { ok: false, stars: 0, message: "Debes especificar '--image-id ami-0c55b159cbfafe1f0'." };
      }
      if (p.options["instance-type"] !== "t3.micro") {
        return { ok: false, stars: 0, message: "Debes indicar '--instance-type t3.micro'." };
      }
      if (p.options["key-name"] !== "cloud-key") {
        return { ok: false, stars: 0, message: "Falta '--key-name cloud-key'." };
      }
      const output = JSON.stringify(
        {
          Instances: [
            {
              InstanceId: "i-0987654321fedcba0",
              InstanceType: "t3.micro",
              ImageId: "ami-0c55b159cbfafe1f0",
              State: { Name: "pending", Code: 0 },
              Placement: { AvailabilityZone: "eu-west-1a" },
            },
          ],
        },
        null,
        2
      );
      return {
        ok: true,
        stars: 3,
        message: "¡Instancia EC2 t3.micro lanzada con éxito en eu-west-1a!",
        simulatedOutput: output,
      };
    },
  },

  // LEVEL 9: Dominio 3 - Security Groups vs NACLs
  {
    id: "lvl-9",
    worldId: "world-3",
    number: 9,
    title: "Security Groups vs Network ACLs",
    service: "EC2 / VPC",
    certification: "AWS Cloud Practitioner (CLF-C02)",
    domain: "Dominio 3: Tecnología & Servicios Core",
    story: "En el examen de certificación SIEMPRE comparan Security Groups y Network ACLs. Comprender su diferencia es fundamental para diseñar redes seguras.",
    explanation: "Security Groups: Operan a nivel de INSTANCIA y son STATEFUL (con estado). Si permites tráfico entrante (inbound), la respuesta saliente se permite automáticamente sin regla explícita. Network ACLs: Operan a nivel de SUBRED y son STATELESS (sin estado, debes autorizar entrada y salida).",
    examTip: "¡Clave de examen absoluta! Security Groups = Stateful (con estado) a nivel de instancia. Network ACLs = Stateless (sin estado) a nivel de subred.",
    example: "aws ec2 authorize-security-group-ingress --group-id sg-0123456789abcdef0 --protocol tcp --port 443 --cidr 0.0.0.0/0",
    mission: "Autoriza tráfico TCP entrante en el puerto 443 (HTTPS) desde cualquier IP (0.0.0.0/0) en el grupo 'sg-0123456789abcdef0'.",
    hint: "El comando es: `aws ec2 authorize-security-group-ingress --group-id sg-0123456789abcdef0 --protocol tcp --port 443 --cidr 0.0.0.0/0`.",
    starterCommand: "aws ec2 authorize-security-group-ingress --group-id sg-0123456789abcdef0",
    rewards: { xp: 85, coins: 30 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "ec2") {
        return { ok: false, stars: 0, message: "Comando inválido. Usa 'aws ec2'." };
      }
      if (p.operation !== "authorize-security-group-ingress") {
        return { ok: false, stars: 0, message: "La llamada requerida es 'authorize-security-group-ingress'." };
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
        return { ok: false, stars: 0, message: "El rango CIDR debe ser '--cidr 0.0.0.0/0'." };
      }
      const output = JSON.stringify(
        {
          Return: true,
          SecurityGroupRules: [{ SecurityGroupRuleId: "sgr-https-rule-1", IpProtocol: "tcp", FromPort: 443, ToPort: 443, CidrIpv4: "0.0.0.0/0" }],
        },
        null,
        2
      );
      return {
        ok: true,
        stars: 3,
        message: "¡Regla HTTPS autorizada en el Security Group Stateful!",
        simulatedOutput: output,
      };
    },
  },

  // LEVEL 10: Dominio 3 - Serverless con AWS Lambda
  {
    id: "lvl-10",
    worldId: "world-3",
    number: 10,
    title: "Computación Serverless: AWS Lambda",
    service: "Lambda",
    certification: "AWS Cloud Practitioner (CLF-C02)",
    domain: "Dominio 3: Tecnología & Servicios Core",
    story: "Una empresa quiere procesar imágenes y órdenes de compra cuando ocurran eventos, sin mantener servidores encendidos 24/7 pagando por CPU ociosa. La solución serverless por excelencia es AWS Lambda.",
    explanation: "Con AWS Lambda ejecutas código sin aprovisionar ni administrar servidores. Escala automáticamente desde 0 a miles de ejecuciones concurrentes en milisegundos y solo pagas por el tiempo de cómputo consumido (en bloques de 1 ms).",
    examTip: "En la certificación: Lambda es 'Event-Driven' (dirigido por eventos). Si no hay peticiones, cuesta 0€ y escala a cero. Los servidores tradicionales de EC2, en cambio, facturan por cada segundo encendidos.",
    example: "aws lambda create-function --function-name mi-fn --runtime nodejs20.x --role arn:aws:iam::123456789012:role/MiRol --handler index.handler --zip-file fileb://code.zip",
    mission: "Crea la función 'procesar-pedidos' con runtime `nodejs20.x`, rol `arn:aws:iam::123456789012:role/LambdaExecutionRole`, handler `index.handler` y zip `fileb://function.zip`.",
    hint: "Escribe: `aws lambda create-function --function-name procesar-pedidos --runtime nodejs20.x --role arn:aws:iam::123456789012:role/LambdaExecutionRole --handler index.handler --zip-file fileb://function.zip`.",
    starterCommand: "aws lambda create-function --function-name procesar-pedidos",
    rewards: { xp: 95, coins: 35 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "lambda") {
        return { ok: false, stars: 0, message: "Usa la CLI con el servicio 'aws lambda'." };
      }
      if (p.operation !== "create-function") {
        return { ok: false, stars: 0, message: "La llamada requerida es 'create-function'." };
      }
      if (p.options["function-name"] !== "procesar-pedidos") {
        return { ok: false, stars: 0, message: "El nombre debe ser '--function-name procesar-pedidos'." };
      }
      if (p.options["runtime"] !== "nodejs20.x") {
        return { ok: false, stars: 0, message: "Indica el runtime '--runtime nodejs20.x'." };
      }
      if (p.options["role"] !== "arn:aws:iam::123456789012:role/LambdaExecutionRole") {
        return { ok: false, stars: 0, message: "El rol debe ser '--role arn:aws:iam::123456789012:role/LambdaExecutionRole'." };
      }
      if (p.options["handler"] !== "index.handler") {
        return { ok: false, stars: 0, message: "El manejador debe ser '--handler index.handler'." };
      }
      if (p.options["zip-file"] !== "fileb://function.zip") {
        return { ok: false, stars: 0, message: "Indica '--zip-file fileb://function.zip'." };
      }
      const output = JSON.stringify(
        {
          FunctionName: "procesar-pedidos",
          FunctionArn: "arn:aws:lambda:eu-west-1:123456789012:function:procesar-pedidos",
          Runtime: "nodejs20.x",
          Role: "arn:aws:iam::123456789012:role/LambdaExecutionRole",
          Handler: "index.handler",
          State: "Active",
          MemorySize: 128,
        },
        null,
        2
      );
      return {
        ok: true,
        stars: 3,
        message: "¡Función Lambda Serverless creada! Cero servidores que administrar.",
        simulatedOutput: output,
      };
    },
  },

  // LEVEL 11: Dominio 3 - Redes y Amazon VPC
  {
    id: "lvl-11",
    worldId: "world-3",
    number: 11,
    title: "Aislamiento de Red: Amazon VPC",
    service: "VPC",
    certification: "AWS Cloud Practitioner (CLF-C02)",
    domain: "Dominio 3: Tecnología & Servicios Core",
    story: "Todo recurso corporativo debe aislarse en su propia red virtual lógica privada. Amazon VPC (Virtual Private Cloud) permite definir el rango de direcciones IP privadas, subredes, tablas de enrutamiento y pasarelas a internet (Internet Gateways).",
    explanation: "Una VPC abarca todas las Zonas de Disponibilidad dentro de una Región. Al crearla se define un bloque CIDR (Classless Inter-Domain Routing). El bloque `10.0.0.0/16` proporciona 65,536 direcciones IP privadas para organizar subredes públicas (web) y privadas (bases de datos).",
    examTip: "Concepto de examen: Una VPC es REGIONAL (no global). Dentro de la VPC, cada subred reside exactamente en UNA sola Zona de Disponibilidad.",
    example: "aws ec2 create-vpc --cidr-block 10.0.0.0/16",
    mission: "Crea una nueva VPC con el bloque de direcciones CIDR `10.0.0.0/16`.",
    hint: "Escribe: `aws ec2 create-vpc --cidr-block 10.0.0.0/16`.",
    starterCommand: "aws ec2 create-vpc --cidr-block",
    rewards: { xp: 100, coins: 40 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "ec2") {
        return { ok: false, stars: 0, message: "La gestión de VPC se realiza mediante 'aws ec2'." };
      }
      if (p.operation !== "create-vpc") {
        return { ok: false, stars: 0, message: "La llamada requerida es 'create-vpc'." };
      }
      if (p.options["cidr-block"] !== "10.0.0.0/16") {
        return { ok: false, stars: 0, message: "El bloque CIDR debe ser exactamente '--cidr-block 10.0.0.0/16'." };
      }
      const output = JSON.stringify(
        {
          Vpc: {
            VpcId: "vpc-0123456789abcdef0",
            CidrBlock: "10.0.0.0/16",
            State: "available",
            IsDefault: false,
          },
        },
        null,
        2
      );
      return {
        ok: true,
        stars: 3,
        message: "¡VPC creada con 65,536 IPs privadas listas para segmentar en subredes!",
        simulatedOutput: output,
      };
    },
  },

  // LEVEL 12: Dominio 4 - Costes & Clases de Almacenamiento S3
  {
    id: "lvl-12",
    worldId: "world-4",
    number: 12,
    title: "Optimización de Costes con S3 Storage Classes",
    service: "S3 / Facturación",
    certification: "AWS Cloud Practitioner (CLF-C02)",
    domain: "Dominio 4: Costes & Arquitectura",
    story: "Uno de los 6 Pilares del AWS Well-Architected Framework es la Optimización de Costes (Cost Optimization). Guardar backups mensuales en la clase S3 Standard desperdicia presupuesto, mientras que S3 Standard-IA (Infrequent Access) ofrece el mismo rendimiento con un coste hasta un 50% inferior.",
    explanation: "Clases de almacenamiento de Amazon S3 en el examen: 1) S3 Standard (datos de acceso frecuente), 2) S3 Standard-IA (acceso poco frecuente pero disponibilidad inmediata), 3) S3 One Zone-IA (menor coste en 1 sola AZ), 4) S3 Glacier Flexible Retrieval (archivo en minutos/horas), 5) S3 Glacier Deep Archive (el más barato del mundo, recuperación en 12h).",
    examTip: "En el examen: S3 Intelligent-Tiering mueve automáticamente los objetos entre niveles de acceso frecuente y poco frecuente cuando los patrones de acceso son desconocidos o cambiantes, sin cuotas de recuperación.",
    example: "aws s3 cp backup.tar.gz s3://empresa-datos-seguros/backup.tar.gz --storage-class STANDARD_IA",
    mission: "Copia el backup local a S3 configurando la clase de acceso poco frecuente con `--storage-class STANDARD_IA`.",
    hint: "El comando es: `aws s3 cp backup.tar.gz s3://empresa-datos-seguros/backup.tar.gz --storage-class STANDARD_IA`.",
    starterCommand: "aws s3 cp backup.tar.gz s3://empresa-datos-seguros/backup.tar.gz",
    rewards: { xp: 120, coins: 50 },
    validate: (cmd: string): ValidationResult => {
      const p = parseAwsCommand(cmd);
      if (p.program !== "aws" || p.service !== "s3") {
        return { ok: false, stars: 0, message: "Comando inválido. Usa 'aws s3'." };
      }
      if (p.operation !== "cp") {
        return { ok: false, stars: 0, message: "La llamada requerida es 'cp' (copy)." };
      }
      if (p.positionals[0] !== "backup.tar.gz") {
        return { ok: false, stars: 0, message: "El origen debe ser 'backup.tar.gz'." };
      }
      if (!p.positionals[1] || (!p.positionals[1].startsWith("s3://empresa-datos-seguros/") && !p.positionals[1].startsWith("s3://empresa-logs-seguros/"))) {
        return { ok: false, stars: 0, message: "El destino debe ser 's3://empresa-datos-seguros/backup.tar.gz'." };
      }
      if (p.options["storage-class"] !== "STANDARD_IA") {
        return { ok: false, stars: 0, message: "Debes especificar la clase de coste reducido con '--storage-class STANDARD_IA'." };
      }
      return {
        ok: true,
        stars: 3,
        message: "¡Copia con clase STANDARD_IA completada! Pilar de Optimización de Costes superado con éxito.",
        simulatedOutput: "upload: ./backup.tar.gz to s3://empresa-datos-seguros/backup.tar.gz (StorageClass: STANDARD_IA)",
      };
    },
  },
];
