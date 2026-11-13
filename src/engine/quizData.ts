export interface QuizQuestion {
  id: string;
  domainId: number;
  domainName: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  examTip: string;
}

export const CLF_QUIZ_QUESTIONS: QuizQuestion[] = [
  // --- DOMINIO 1: CONCEPTOS CLOUD ---
  {
    id: "q-1",
    domainId: 1,
    domainName: "Dominio 1: Conceptos Cloud (24%)",
    question: "¿Cuál es una ventaja financiera directa de migrar la infraestructura local a la nube de AWS?",
    options: [
      "Sustituir los gastos de capital fijos (CapEx) por gastos variables operativos (OpEx).",
      "Garantizar que todo el tráfico de red sea completamente gratuito en todo momento.",
      "Eliminar por completo la necesidad de administrar permisos y usuarios en la organización.",
      "Asegurar que las aplicaciones sean automáticamente 100% inmunes a caídas de software."
    ],
    correctIndex: 0,
    explanation: "Una de las mayores ventajas del Cloud Computing según el marco oficial de AWS es cambiar la inversión inicial masiva en centros de datos y hardware físico (CapEx o Capital Expenditures) por un coste operativo variable según el consumo real (OpEx o Operational Expenditures).",
    examTip: "En el examen: CapEx = Inversión previa en hardware fijo. OpEx = Pago por uso variable sin contratos a largo plazo forzados."
  },
  {
    id: "q-2",
    domainId: 1,
    domainName: "Dominio 1: Conceptos Cloud (24%)",
    question: "Una tienda online experimenta picos imprevistos de tráfico durante el Black Friday. ¿Qué concepto de AWS describe la capacidad de aprovisionar recursos automáticamente para satisfacer la demanda y reducirlos cuando el tráfico baja?",
    options: [
      "Agilidad",
      "Elasticidad",
      "Disponibilidad global",
      "Fiabilidad estática"
    ],
    correctIndex: 1,
    explanation: "La Elasticidad es la capacidad del sistema de adquirir recursos automáticamente cuando la demanda lo requiere y liberarlos cuando ya no son necesarios, evitando sobrecostes por capacidad ociosa.",
    examTip: "Elasticidad = Crecer y encoger según la demanda (e.g. EC2 Auto Scaling). Escalabilidad = Capacidad de crecer ante mayor carga a largo plazo."
  },
  {
    id: "q-3",
    domainId: 1,
    domainName: "Dominio 1: Conceptos Cloud (24%)",
    question: "¿Qué afirmación describe de forma correcta una Zona de Disponibilidad (Availability Zone - AZ) de AWS?",
    options: [
      "Es una única sala con un solo servidor en una ubicación geográfica.",
      "Es una réplica exacta de la nube pública instalada físicamente en la oficina del cliente.",
      "Es una ubicación compuesta por uno o más centros de datos físicos discretos, con energía y conectividad redundantes.",
      "Es un punto de presencia exclusivamente reservado para el almacenamiento en frío de Amazon S3 Glacier."
    ],
    correctIndex: 2,
    explanation: "Una Zona de Disponibilidad (AZ) es una ubicación aislada dentro de una Región de AWS, formada por uno o más centros de datos independientes con fuentes de alimentación, refrigeración y redes redundantes.",
    examTip: "Recuerda: Una Región tiene múltiples AZs (al menos 3). Una AZ puede tener uno o múltiples centros de datos físicos."
  },
  {
    id: "q-4",
    domainId: 1,
    domainName: "Dominio 1: Conceptos Cloud (24%)",
    question: "Según el Modelo de Responsabilidad Compartida de AWS, ¿cuál de las siguientes tareas es responsabilidad exclusiva del CLIENTE?",
    options: [
      "La destrucción física de los discos duros obsoletos en los centros de datos de AWS.",
      "El mantenimiento y parcheo del sistema operativo instalado en una instancia de Amazon EC2.",
      "El mantenimiento de los generadores eléctricos de respaldo en las Zonas de Disponibilidad.",
      "La actualización del software del hipervisor de virtualización que gestiona los servidores."
    ],
    correctIndex: 1,
    explanation: "En Amazon EC2 (IaaS), el cliente es el responsable de configurar, administrar, parchear y actualizar el sistema operativo invitado (Guest OS) y sus aplicaciones. AWS se encarga de la seguridad física de los centros de datos y del hipervisor subyacente.",
    examTip: "Regla de oro del examen: Seguridad DE la nube (hardware, instalaciones, cableado) = AWS. Seguridad EN la nube (datos, IAM, SO de EC2, cortafuegos) = Cliente."
  },
  {
    id: "q-5",
    domainId: 1,
    domainName: "Dominio 1: Conceptos Cloud (24%)",
    question: "¿Qué componente de la infraestructura global de AWS permite almacenar contenido estático y dinámico en caché a baja latencia cerca de los usuarios finales?",
    options: [
      "Edge Locations (Puntos de Presencia) mediante Amazon CloudFront.",
      "Zonas Locales de AWS exclusivamente para bases de datos Aurora.",
      "Dispositivos físicos AWS Snowball Edge instalados en cada hogar.",
      "Volúmenes de Amazon EBS conectados por cable a cada cliente."
    ],
    correctIndex: 0,
    explanation: "Las Edge Locations son puntos de presencia distribuidos en cientos de ciudades del mundo que utiliza Amazon CloudFront para almacenar en caché copias de contenido y entregarlo a milisegundos de distancia de los usuarios.",
    examTip: "Edge Locations = Red de distribución de contenido (CDN) CloudFront + DNS con Route 53 + AWS WAF."
  },

  // --- DOMINIO 2: SEGURIDAD, IDENTIDAD & COMPLIANCE ---
  {
    id: "q-6",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "Siguiendo las mejores prácticas de seguridad de AWS IAM, ¿qué acción se debe tomar con el Usuario Raíz (Root User) tras crear la cuenta?",
    options: [
      "Compartir la contraseña del usuario raíz con todos los administradores del equipo.",
      "Activar MFA (Autenticación Multifactor), bloquear las credenciales y usar usuarios/roles de IAM para el trabajo diario.",
      "Crear una Access Key permanente para el usuario raíz y guardarla en los repositorios de código de la empresa.",
      "Eliminar permanentemente la cuenta de correo asociada al usuario raíz."
    ],
    correctIndex: 1,
    explanation: "El usuario raíz de AWS tiene acceso irrestricto total. La mejor práctica oficial es protegerlo con MFA inmediato, no generar claves de acceso fijas (access keys) y utilizar usuarios y roles de IAM con permisos mínimos para las operaciones habituales.",
    examTip: "Solo se usa Root para: cambiar el plan de soporte de AWS, cerrar la cuenta o restaurar permisos root perdidos."
  },
  {
    id: "q-7",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "Una aplicación ejecutándose en una instancia EC2 necesita leer y escribir archivos en un bucket de Amazon S3. ¿Cuál es el método más seguro recomendado por AWS para conceder este acceso?",
    options: [
      "Incrustar una Access Key y Secret Key permanente de un usuario administrador en el código fuente de la app.",
      "Hacer que el bucket de S3 sea completamente público en internet sin contraseña.",
      "Asignar un Rol de IAM a la instancia EC2 con una política de menor privilegio que use credenciales temporales.",
      "Pedir a los usuarios que inicien sesión manualmente por SSH en la máquina cada vez que suban un archivo."
    ],
    correctIndex: 2,
    explanation: "Los Roles de IAM son la mejor práctica para otorgar permisos a servicios de AWS (como EC2 o Lambda). Proporcionan credenciales temporales generadas automáticamente por AWS STS que rotan solas, sin necesidad de almacenar claves en el código.",
    examTip: "Nunca guardes credenciales fijas en código o instancias; usa siempre Roles de IAM para servicios."
  },
  {
    id: "q-8",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "¿Cuál es la diferencia fundamental entre un Security Group y una Network ACL (NACL) en Amazon VPC?",
    options: [
      "Los Security Groups son Stateful (con estado) a nivel de instancia; las Network ACLs son Stateless (sin estado) a nivel de subred.",
      "Los Security Groups son exclusivos para S3; las Network ACLs son solo para servidores físicos.",
      "Los Security Groups solo pueden denegar tráfico; las Network ACLs solo pueden permitir tráfico.",
      "No existe ninguna diferencia; son dos nombres diferentes para la misma herramienta de software."
    ],
    correctIndex: 0,
    explanation: "Los Security Groups operan a nivel de tarjeta de red de la instancia EC2 y tienen estado (Stateful): si se autoriza el tráfico entrante, la respuesta saliente se permite automáticamente. Las Network ACLs operan a nivel de subred y no tienen estado (Stateless): requieren reglas explícitas de entrada y salida.",
    examTip: "¡Pregunta estrella del examen CLF-C02! Security Group = Stateful / Instancia. Network ACL = Stateless / Subred."
  },
  {
    id: "q-9",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "¿Qué servicio de AWS está diseñado específicamente para proteger aplicaciones web contra ataques comunes de capa 7 (como inyecciones SQL o Cross-Site Scripting - XSS)?",
    options: [
      "AWS Shield Standard",
      "AWS WAF (Web Application Firewall)",
      "Amazon GuardDuty",
      "AWS KMS (Key Management Service)"
    ],
    correctIndex: 1,
    explanation: "AWS WAF es un cortafuegos de aplicaciones web que inspecciona el tráfico HTTP/HTTPS en la capa 7 del modelo OSI para filtrar ataques comunes como SQL Injection o XSS antes de que lleguen a CloudFront, ALB o API Gateway.",
    examTip: "AWS Shield = Protección anti-DDoS (capas 3 y 4). AWS WAF = Cortafuegos web para reglas SQLi/XSS (capa 7)."
  },
  {
    id: "q-10",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "Un auditor externo solicita a una empresa los informes oficiales de cumplimiento de seguridad (como SOC 1, SOC 2 y certificaciones PCI DSS) de los centros de datos de AWS. ¿Dónde se pueden descargar estos documentos bajo demanda?",
    options: [
      "AWS Artifact",
      "AWS CloudTrail",
      "Amazon Inspector",
      "AWS Trusted Advisor"
    ],
    correctIndex: 0,
    explanation: "AWS Artifact es el portal de autoservicio gratuito donde los clientes pueden acceder y descargar directamente los acuerdos de seguridad y los informes de auditoría y cumplimiento de AWS.",
    examTip: "Siempre que el examen pregunte por 'informes de cumplimiento SOC / PCI DSS de AWS', la respuesta es AWS Artifact."
  },

  // --- DOMINIO 3: TECNOLOGÍA & SERVICIOS CORE ---
  {
    id: "q-11",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "Una compañía ejecuta un proceso por lotes nocturno para analizar datos que puede interrumpirse y reiniciarse al día siguiente sin consecuencias críticas. ¿Qué modelo de compra de Amazon EC2 proporcionará el mayor ahorro económico (hasta un 90%)?",
    options: [
      "Instancias On-Demand (Bajo demanda)",
      "Dedicated Hosts (Hosts dedicados)",
      "Spot Instances (Instancias de subasta)",
      "Reserved Instances estándar de 3 años"
    ],
    correctIndex: 2,
    explanation: "Las instancias Spot de EC2 aprovechan la capacidad no utilizada de la nube de AWS con descuentos de hasta el 90% sobre el precio On-Demand. A cambio, AWS puede reclamar la instancia con un aviso de 2 minutos, lo que las hace ideales para cargas de trabajo tolerantes a fallos o que se pueden pausar.",
    examTip: "Cargas tolerantes a interrupciones = Spot Instances. Cargas constantes y críticas a 1-3 años = Savings Plans / Reserved Instances."
  },
  {
    id: "q-12",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "¿Qué afirmación describe con precisión la naturaleza del servicio AWS Lambda?",
    options: [
      "Es un servidor físico dedicado donde el usuario debe configurar Apache y parches de Linux manualmente.",
      "Es un servicio de computación serverless orientado a eventos donde solo se paga por el tiempo de ejecución de código en bloques de milisegundos.",
      "Es un motor de almacenamiento de bloques de alto rendimiento para bases de datos Oracle.",
      "Es un hardware de red para conectar routers de fibra óptica con la oficina física."
    ],
    correctIndex: 1,
    explanation: "AWS Lambda permite ejecutar código sin aprovisionar ni administrar servidores (Serverless). Escala automáticamente en función del número de eventos entrantes y solo factura por la memoria asignada y los milisegundos exactos que tarda en procesar.",
    examTip: "Lambda = Computación Serverless Event-Driven (orientada a eventos). No pagas por servidores inactivos."
  },
  {
    id: "q-13",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "¿Cuál es la principal diferencia entre el almacenamiento de Amazon EBS y Amazon S3?",
    options: [
      "Amazon EBS es almacenamiento de bloques de alta velocidad diseñado para adjuntarse como disco a una instancia EC2; Amazon S3 es almacenamiento de objetos ilimitado accesible por internet mediante HTTP.",
      "Amazon S3 solo permite guardar hasta 100 megabytes en total por cuenta.",
      "Amazon EBS es accesible desde cualquier navegador web público sin autenticación.",
      "Amazon S3 requiere formatear el disco con un sistema de archivos NTFS o ext4 antes de usarlo."
    ],
    correctIndex: 0,
    explanation: "Amazon EBS (Elastic Block Store) proporciona almacenamiento a nivel de bloque para instancias EC2 (como un disco duro virtual SSD). Amazon S3 (Simple Storage Service) almacena objetos (archivos y metadatos) en depósitos (buckets) altamente durables (99.999999999% de durabilidad) con acceso mediante API o web.",
    examTip: "EBS = Disco duro de bloque para 1 máquina EC2. EFS = Carpeta de red compartida para muchas EC2. S3 = Almacenamiento de objetos ilimitado."
  },
  {
    id: "q-14",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "Una aplicación móvil de juegos a escala global requiere una base de datos NoSQL totalmente administrada que proporcione tiempos de respuesta de milisegundos de un solo dígito con escalado horizontal automático. ¿Qué servicio de AWS se debe elegir?",
    options: [
      "Amazon RDS para PostgreSQL",
      "Amazon DynamoDB",
      "Amazon Redshift",
      "Amazon DocumentDB en modo manual"
    ],
    correctIndex: 1,
    explanation: "Amazon DynamoDB es una base de datos NoSQL de clave-valor y documentos totalmente administrada por AWS que ofrece un rendimiento constante de milisegundos de un solo dígito a cualquier escala con cero administración de servidores.",
    examTip: "Base de datos Relacional (SQL, tablas, joins) = Amazon RDS / Amazon Aurora. Base de datos NoSQL (clave-valor, serverless, milisegundos) = Amazon DynamoDB."
  },
  {
    id: "q-15",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "Para lograr una arquitectura con Alta Disponibilidad y tolerancia a fallos, ¿cómo se deben configurar las instancias de Amazon EC2 detrás de un Elastic Load Balancer (ELB)?",
    options: [
      "Alojando todas las instancias en un único centro de datos para reducir costes de cableado.",
      "Distribuyendo las instancias en múltiples Zonas de Disponibilidad (Multi-AZ) dentro de la misma Región.",
      "Configurando una sola instancia con 128 CPUs en una sola Zona de Disponibilidad.",
      "Desactivando el cortafuegos de seguridad para acelerar el tráfico de entrada."
    ],
    correctIndex: 1,
    explanation: "La mejor práctica del AWS Well-Architected Framework para resiliencia ante desastres es desplegar instancias en al menos dos Zonas de Disponibilidad distintas (Multi-AZ). El Elastic Load Balancer distribuye automáticamente el tráfico solo hacia las instancias sanas.",
    examTip: "Alta Disponibilidad en AWS = Despliegue Multi-AZ (múltiples Zonas de Disponibilidad) con Elastic Load Balancing."
  },

  // --- DOMINIO 4: FACTURACIÓN, COSTES & ARQUITECTURA ---
  {
    id: "q-16",
    domainId: 4,
    domainName: "Dominio 4: Costes & Gobernanza (12%)",
    question: "El director financiero desea recibir un correo electrónico y una alerta automática antes de que el gasto mensual en AWS supere los 500€. ¿Qué servicio de AWS se encarga de monitorizar y alertar sobre límites de presupuesto?",
    options: [
      "AWS Cost Explorer",
      "AWS Budgets",
      "AWS Pricing Calculator",
      "Amazon Athena"
    ],
    correctIndex: 1,
    explanation: "AWS Budgets permite establecer presupuestos de costes y uso personalizados y envía alertas automáticas (por email o SNS) cuando los costes reales o previstos superan los umbrales definidos.",
    examTip: "AWS Budgets = Alertas proactivas de presupuesto. AWS Cost Explorer = Gráficos y análisis histórico de costes. Pricing Calculator = Estimar costes de proyectos nuevos."
  },
  {
    id: "q-17",
    domainId: 4,
    domainName: "Dominio 4: Costes & Gobernanza (12%)",
    question: "Una corporación gestiona 15 cuentas de AWS independientes para diferentes departamentos. ¿Qué servicio permite consolidar la facturación en una única factura y aplicar directivas de control de servicios (SCPs)?",
    options: [
      "AWS Organizations",
      "AWS Config",
      "AWS CloudTrail",
      "Amazon Macie"
    ],
    correctIndex: 0,
    explanation: "AWS Organizations permite gobernar y gestionar de forma centralizada múltiples cuentas de AWS. Ofrece facturación consolidada (obteniendo descuentos por volumen agrupado) y Service Control Policies (SCPs) para limitar permisos a nivel de cuenta.",
    examTip: "Múltiples cuentas + Facturación consolidada + SCPs = AWS Organizations."
  },
  {
    id: "q-18",
    domainId: 4,
    domainName: "Dominio 4: Costes & Gobernanza (12%)",
    question: "¿Qué herramienta automatizada de AWS examina los recursos de la cuenta y ofrece recomendaciones organizadas en 5 categorías (Optimización de costes, Seguridad, Tolerancia a fallos, Rendimiento y Límites de servicio)?",
    options: [
      "AWS Trusted Advisor",
      "Amazon Inspector",
      "AWS CloudFormation",
      "AWS CodeDeploy"
    ],
    correctIndex: 0,
    explanation: "AWS Trusted Advisor es una herramienta de orientación en línea que analiza el entorno del cliente y compara su configuración con las mejores prácticas de AWS en costes, seguridad, tolerancia a fallos, rendimiento y cuotas de servicio.",
    examTip: "Trusted Advisor evalúa: Costes, Seguridad, Tolerancia a fallos, Rendimiento y Cuotas/Límites de servicio."
  },
  {
    id: "q-19",
    domainId: 4,
    domainName: "Dominio 4: Costes & Gobernanza (12%)",
    question: "Un arquitecto de seguridad necesita auditar qué usuario eliminó una base de datos de producción la semana pasada y desde qué dirección IP se realizó la llamada a la API. ¿Qué servicio registra todas las llamadas a la API de AWS?",
    options: [
      "Amazon CloudWatch",
      "AWS CloudTrail",
      "AWS X-Ray",
      "VPC Flow Logs"
    ],
    correctIndex: 1,
    explanation: "AWS CloudTrail registra y guarda un historial continuo de todas las acciones y llamadas a la API realizadas en la cuenta de AWS (quién, qué, cuándo y desde qué IP se hizo cada petición).",
    examTip: "Diferencia crítica: CloudWatch = Métricas de rendimiento, CPU, alarmas y logs de aplicación. CloudTrail = Auditoría de quién llamó a qué API (gobernanza y seguridad)."
  },
  {
    id: "q-20",
    domainId: 4,
    domainName: "Dominio 4: Costes & Gobernanza (12%)",
    question: "¿Cuáles son los 6 Pilares oficiales del AWS Well-Architected Framework?",
    options: [
      "Excelencia Operativa, Seguridad, Fiabilidad, Eficiencia del Rendimiento, Optimización de Costes y Sostenibilidad.",
      "Velocidad, Hardware, Discos SSD, Conectividad de Fibra, Electricidad y Refrigeración.",
      "Usuarios IAM, Contraseñas, Grupos de Seguridad, Subnets, Routers y Tablas de Enrutamiento.",
      "Bajo coste, Código Abierto, Contenedores Docker, Kubernetes, Linux y Servidores Físicos."
    ],
    correctIndex: 0,
    explanation: "El AWS Well-Architected Framework describe los principios de diseño y buenas prácticas arquitectónicas en 6 pilares: 1) Excelencia Operativa, 2) Seguridad, 3) Fiabilidad, 4) Eficiencia del Rendimiento, 5) Optimización de Costes y 6) Sostenibilidad.",
    examTip: "Los 6 Pilares: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability."
  }
];
