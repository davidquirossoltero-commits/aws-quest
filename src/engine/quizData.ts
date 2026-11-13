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
  // =========================================================================
  // DOMINIO 1: CONCEPTOS DE CLOUD (24%) - 16 Preguntas
  // =========================================================================
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
  {
    id: "q-6",
    domainId: 1,
    domainName: "Dominio 1: Conceptos Cloud (24%)",
    question: "¿Cómo beneficia la 'Economía de Escala' masiva de AWS a los clientes individuales?",
    options: [
      "Permite a AWS negociar precios más bajos con proveedores e implementar reducciones periódicas en los precios de los servicios.",
      "Obliga a todos los clientes a comprar contratos anuales obligatorios.",
      "Garantiza que todas las máquinas virtuales se ejecuten siempre a la máxima velocidad sin importar el tamaño.",
      "Elimina la necesidad de cifrar los datos confidenciales almacenados."
    ],
    correctIndex: 0,
    explanation: "Gracias al enorme volumen de clientes agregados en la nube, AWS adquiere hardware y conectividad a gran escala, trasladando ahorros constantes a los clientes en forma de precios por uso decrecientes.",
    examTip: "Pilar económico: Beneficiarse de las economías de escala masivas es una de las 6 ventajas del Cloud Computing de AWS."
  },
  {
    id: "q-7",
    domainId: 1,
    domainName: "Dominio 1: Conceptos Cloud (24%)",
    question: "¿Qué servicio permite a una empresa extender la infraestructura, servicios, APIs y herramientas nativas de AWS directamente a su propio centro de datos local (on-premises)?",
    options: [
      "AWS Outposts",
      "AWS Snowmobile",
      "Amazon WorkSpaces",
      "AWS Direct Connect Gateway"
    ],
    correctIndex: 0,
    explanation: "AWS Outposts entrega racks de servidores físicos gestionados por AWS directamente en el data center del cliente, permitiendo ejecutar servicios nativos de AWS (como EC2 o EBS) localmente para cargas con requerimientos estrictos de latencia o soberanía local.",
    examTip: "Examen: AWS Outposts = Nube híbrida real con hardware físico de AWS instalado en tu propio centro de datos."
  },
  {
    id: "q-8",
    domainId: 1,
    domainName: "Dominio 1: Conceptos Cloud (24%)",
    question: "¿Cuál es el modelo de servicio en la nube donde el proveedor gestiona el hardware, el sistema operativo, los parches y el entorno de ejecución, dejando al cliente únicamente la carga del código de la aplicación (por ejemplo, AWS Elastic Beanstalk)?",
    options: [
      "PaaS (Plataforma como Servicio)",
      "IaaS (Infraestructura como Servicio)",
      "SaaS (Software como Servicio)",
      "BaaS (Hardware como Servicio)"
    ],
    correctIndex: 0,
    explanation: "En PaaS (Platform as a Service), el cliente no gestiona el sistema operativo subyacente ni los parches de red; únicamente sube su código y la plataforma se encarga del aprovisionamiento, balanceo y escalado.",
    examTip: "IaaS = EC2 (administras el SO). PaaS = Elastic Beanstalk / RDS (administras datos y código). SaaS = Microsoft 365, Salesforce (solo usas la app)."
  },
  {
    id: "q-9",
    domainId: 1,
    domainName: "Dominio 1: Conceptos Cloud (24%)",
    question: "Una startup en fase inicial desea lanzar su aplicación simultáneamente para usuarios de Europa, América y Asia en cuestión de minutos. ¿Qué ventaja de la nube de AWS hace esto posible?",
    options: [
      "Despliegue global en cuestión de minutos (Go global in minutes).",
      "Aprovisionamiento manual de cables submarinos por el cliente.",
      "Contratación obligatoria de centros de datos en cada país.",
      "Uso de servidores dedicados de hosting compartido."
    ],
    correctIndex: 0,
    explanation: "'Go global in minutes' (despliegue global en minutos) es una de las ventajas esenciales de AWS: permite desplegar aplicaciones en múltiples regiones y edge locations de todo el mundo con unos pocos clics o comandos.",
    examTip: "Ventajas de AWS: 1) Cambiar CapEx por OpEx, 2) Economías de escala, 3) Dejar de adivinar capacidad, 4) Aumentar velocidad y agilidad, 5) Dejar de gastar en data centers, 6) Despliegue global en minutos."
  },
  {
    id: "q-10",
    domainId: 1,
    domainName: "Dominio 1: Conceptos Cloud (24%)",
    question: "En un despliegue de base de datos administrada con Amazon RDS, ¿de qué tarea es responsable AWS según el Modelo de Responsabilidad Compartida?",
    options: [
      "Parchear y actualizar el sistema operativo subyacente y el motor de base de datos.",
      "Optimizar las consultas SQL lentas creadas por los desarrolladores.",
      "Crear las tablas y definir las claves primarias relacionales.",
      "Gestionar las contraseñas de los usuarios finales de la aplicación."
    ],
    correctIndex: 0,
    explanation: "Amazon RDS es un servicio administrado (PaaS). AWS se encarga de aprovisionar el servidor, aplicar parches de seguridad al sistema operativo y realizar backups automáticos. El cliente es responsable de los datos, el esquema y las consultas SQL.",
    examTip: "En EC2 tú parcheas el SO. En RDS AWS parchea el SO y la base de datos automáticamente."
  },
  {
    id: "q-11",
    domainId: 1,
    domainName: "Dominio 1: Conceptos Cloud (24%)",
    question: "¿Qué término describe la capacidad de un sistema para permanecer operativo y responder ante fallos de componentes individuales (como la caída de un servidor o una Zona de Disponibilidad completa)?",
    options: [
      "Tolerancia a fallos y Alta Disponibilidad",
      "Elasticidad estática",
      "Latencia mínima",
      "Cumplimiento legal"
    ],
    correctIndex: 0,
    explanation: "La Alta Disponibilidad y la Tolerancia a Fallos aseguran que si un componente o una AZ entera sufre un incidente, el tráfico se redirige automáticamente hacia instancias y recursos redundantes sin interrupción de servicio para los usuarios.",
    examTip: "Alta disponibilidad = Redundancia Multi-AZ con Elastic Load Balancing para tolerar fallos sin caídas."
  },
  {
    id: "q-12",
    domainId: 1,
    domainName: "Dominio 1: Conceptos Cloud (24%)",
    question: "¿Cuál es el modelo de despliegue donde una empresa mantiene parte de sus sistemas heredados en su propio centro de datos local y ejecuta sus nuevas aplicaciones web en la nube de AWS?",
    options: [
      "Despliegue Híbrido (Hybrid Cloud)",
      "Despliegue 100% On-premises",
      "Despliegue Solo Servidor Físico",
      "Despliegue Monolítico Cerrado"
    ],
    correctIndex: 0,
    explanation: "El modelo de nube híbrida conecta la infraestructura existente on-premises con recursos en la nube pública de AWS mediante conexiones dedicadas como AWS Direct Connect o túneles VPN cifrados.",
    examTip: "Modelos de despliegue: 1) Todo Cloud (All-in), 2) Híbrido (Data Center + AWS), 3) Privado / Local."
  },
  {
    id: "q-13",
    domainId: 1,
    domainName: "Dominio 1: Conceptos Cloud (24%)",
    question: "¿Qué afirmación es VERDADERA sobre las Regiones de AWS?",
    options: [
      "Cada Región está completamente aislada de las demás para maximizar la estabilidad y tolerancia a desastres geográficos.",
      "Todas las Regiones comparten automáticamente las mismas bases de datos sin necesidad de configuración.",
      "Una Región consta siempre de una sola sala de servidores compartida con otros proveedores.",
      "Las Regiones solo existen en territorio estadounidense."
    ],
    correctIndex: 0,
    explanation: "Cada Región de AWS está diseñada para estar completamente aislada de las otras Regiones. Esto garantiza la mayor tolerancia a fallos y estabilidad posible, además de permitir cumplir con leyes de residencia de datos por país o continente.",
    examTip: "Las Regiones son independientes. Los datos no se transfieren entre regiones a menos que tú lo configures explícitamente."
  },
  {
    id: "q-14",
    domainId: 1,
    domainName: "Dominio 1: Conceptos Cloud (24%)",
    question: "En una estrategia de Recuperación ante Desastres (Disaster Recovery), ¿qué métrica define la cantidad máxima de tiempo aceptable que puede estar caído un servicio tras un incidente?",
    options: [
      "RTO (Recovery Time Objective)",
      "RPO (Recovery Point Objective)",
      "IOPS (Input/Output Operations)",
      "MTU (Maximum Transmission Unit)"
    ],
    correctIndex: 0,
    explanation: "RTO (Recovery Time Objective) es el tiempo máximo permitido para restaurar el servicio tras un desastre. RPO (Recovery Point Objective) es la cantidad máxima de datos perdidos medida en tiempo (ej: backups cada 1 hora = RPO de 1h).",
    examTip: "RTO = Tiempo para volver a estar online. RPO = Datos que te puedes permitir perder en tiempo de backup."
  },
  {
    id: "q-15",
    domainId: 1,
    domainName: "Dominio 1: Conceptos Cloud (24%)",
    question: "¿Qué tipo de estrategia de Recuperación ante Desastres (Disaster Recovery) en AWS mantiene una versión mínima central encendida continuamente en una segunda Región lista para escalar de inmediato si la principal falla?",
    options: [
      "Pilot Light (Luz piloto)",
      "Backup & Restore tradicional",
      "Cold Standby absoluto",
      "Manual Reboot"
    ],
    correctIndex: 0,
    explanation: "En la estrategia 'Pilot Light', los servicios centrales críticos (como la replicación continua de bases de datos) se mantienen funcionando en la región secundaria, mientras que los servidores web se provisionan rápidamente solo si ocurre un desastre.",
    examTip: "DR Strategies de menor a mayor coste/velocidad: 1) Backup & Restore, 2) Pilot Light, 3) Warm Standby, 4) Multi-Site Active/Active."
  },
  {
    id: "q-16",
    domainId: 1,
    domainName: "Dominio 1: Conceptos Cloud (24%)",
    question: "¿Por qué se dice que el Cloud Computing permite 'dejar de adivinar las necesidades de capacidad'?",
    options: [
      "Porque los recursos se pueden escalar o desaprovisionar dinámicamente según evoluciona la carga real.",
      "Porque AWS regala servidores infinitos a todas las cuentas nuevas.",
      "Porque los servidores físicos nunca se quedan sin espacio en disco duro.",
      "Porque las empresas ya no necesitan monitorizar sus aplicaciones."
    ],
    correctIndex: 0,
    explanation: "Antes de la nube, las empresas debían comprar servidores caros basándose en estimaciones que solían acabar en capacidad ociosa desperdiciada o caídas por falta de recursos. Con AWS, se escala según demanda.",
    examTip: "'Dejar de adivinar capacidad': pagas solo por lo que usas y ajustas la escala en tiempo real."
  },

  // =========================================================================
  // DOMINIO 2: SEGURIDAD, IDENTIDAD & COMPLIANCE (30%) - 20 Preguntas
  // =========================================================================
  {
    id: "q-17",
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
    id: "q-18",
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
    id: "q-19",
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
    id: "q-20",
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
    id: "q-21",
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
  {
    id: "q-22",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "¿Qué servicio de AWS administra centralizadamente las claves criptográficas para el cifrado en reposo y se integra automáticamente con S3, EBS y RDS?",
    options: [
      "AWS KMS (Key Management Service)",
      "AWS Secrets Manager",
      "AWS Shield Advanced",
      "Amazon Cognito"
    ],
    correctIndex: 0,
    explanation: "AWS KMS permite crear, almacenar y controlar fácilmente claves criptográficas utilizadas para cifrar los datos en reposo en prácticamente todos los servicios de almacenamiento y bases de datos de AWS.",
    examTip: "Cifrado en reposo con claves administradas = AWS KMS. Módulo monoinquilino con hardware FIPS dedicado = AWS CloudHSM."
  },
  {
    id: "q-23",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "¿Qué servicio inteligente monitoriza continuamente el entorno de AWS analizando logs de VPC Flow Logs, DNS y CloudTrail mediante Machine Learning para detectar actividades maliciosas (como minería de criptomonedas no autorizada)?",
    options: [
      "Amazon GuardDuty",
      "Amazon Inspector",
      "AWS Trusted Advisor",
      "Amazon CloudWatch Logs"
    ],
    correctIndex: 0,
    explanation: "Amazon GuardDuty es un servicio de detección de amenazas inteligente que protege cuentas y cargas de trabajo de AWS mediante análisis continuo de telemetría y algoritmos de Machine Learning.",
    examTip: "Detección de amenazas inteligente / anómalas en red y cuenta = Amazon GuardDuty."
  },
  {
    id: "q-24",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "Una compañía desea escanear automáticamente sus instancias EC2 y sus imágenes de contenedores en ECR para detectar vulnerabilidades de software conocidas (CVEs) y exposiciones involuntarias a internet. ¿Qué servicio realiza este análisis?",
    options: [
      "Amazon Inspector",
      "Amazon Macie",
      "AWS Shield",
      "AWS Firewall Manager"
    ],
    correctIndex: 0,
    explanation: "Amazon Inspector es un servicio automatizado de gestión de vulnerabilidades que evalúa continuamente instancias EC2, funciones Lambda e imágenes de contenedores en busca de vulnerabilidades de software y exposiciones de red no deseadas.",
    examTip: "Escaneo de vulnerabilidades CVE en máquinas e imágenes de contenedor = Amazon Inspector."
  },
  {
    id: "q-25",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "¿Qué servicio de seguridad de datos utiliza Machine Learning para descubrir, clasificar y proteger automáticamente información confidencial (como números de tarjetas de crédito o datos personales PII) almacenada en Amazon S3?",
    options: [
      "Amazon Macie",
      "Amazon GuardDuty",
      "AWS Secrets Manager",
      "Amazon Inspector"
    ],
    correctIndex: 0,
    explanation: "Amazon Macie es un servicio de seguridad y privacidad que utiliza aprendizaje automático y coincidencia de patrones para descubrir y proteger automáticamente datos personales identificables (PII) en depósitos de Amazon S3.",
    examTip: "Descubrimiento de datos confidenciales y PII en S3 = Amazon Macie."
  },
  {
    id: "q-26",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "Una aplicación web necesita almacenar contraseñas de bases de datos y rotarlas automáticamente cada 30 días de forma integrada con Amazon RDS sin interrumpir el servicio. ¿Qué herramienta se debe utilizar?",
    options: [
      "AWS Secrets Manager",
      "AWS Systems Manager Parameter Store estándar",
      "AWS KMS",
      "AWS Certificate Manager"
    ],
    correctIndex: 0,
    explanation: "AWS Secrets Manager permite proteger los secretos necesarios para acceder a aplicaciones y servicios, e incluye rotación automática integrada para credenciales de bases de datos de Amazon RDS, DocumentDB y Redshift.",
    examTip: "Rotación automática de contraseñas de base de datos = AWS Secrets Manager."
  },
  {
    id: "q-27",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "En una política de permisos de AWS IAM escrita en formato JSON, ¿qué efecto tiene una regla explícita 'Deny' si coincide con una solicitud que también tiene una regla 'Allow'?",
    options: [
      "El 'Deny' explícito anula y prevalece siempre sobre cualquier 'Allow'.",
      "El 'Allow' tiene prioridad porque es el permiso más permisivo.",
      "Se promedian los dos permisos y se concede acceso de solo lectura.",
      "La política da error de sintaxis y se bloquea la cuenta entera."
    ],
    correctIndex: 0,
    explanation: "En la evaluación de políticas de IAM, por defecto todo acceso está denegado (Default Deny). Si existe una regla 'Allow', se concede acceso; pero si existe cualquier 'Deny' explícito que coincida, este deniega la solicitud inmediatamente sin excepción.",
    examTip: "Regla fija: Deny explícito > Allow explícito > Default Deny implícito."
  },
  {
    id: "q-28",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "¿Qué servicio ofrece protección gestionada contra ataques DDoS (Distributed Denial of Service) de capas 3 y 4 de forma automática y gratuita para todos los clientes de AWS?",
    options: [
      "AWS Shield Standard",
      "AWS Shield Advanced",
      "AWS WAF",
      "Amazon CloudFront con coste extra"
    ],
    correctIndex: 0,
    explanation: "AWS Shield Standard defiende automáticamente a todos los clientes de AWS sin coste adicional contra los ataques DDoS más comunes y frecuentes que ocurren en las capas de red y transporte (capas 3 y 4 del modelo OSI).",
    examTip: "Shield Standard = Protección anti-DDoS básica gratuita para todos. Shield Advanced = Protección de pago 24/7 con equipo SRT y mitigación económica."
  },
  {
    id: "q-29",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "¿Qué servicio centraliza y gestiona el inicio de sesión único (Single Sign-On) de los empleados corporativos para acceder a múltiples cuentas de AWS y aplicaciones empresariales?",
    options: [
      "AWS IAM Identity Center (anteriormente AWS SSO)",
      "Amazon Cognito User Pools",
      "AWS Directory Service Connector",
      "AWS CloudTrail Console"
    ],
    correctIndex: 0,
    explanation: "AWS IAM Identity Center facilita la administración centralizada de accesos de inicio de sesión único a múltiples cuentas de AWS y aplicaciones empresariales compatibles con SAML.",
    examTip: "SSO corporativo para empleados en múltiples cuentas de AWS = IAM Identity Center."
  },
  {
    id: "q-30",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "¿Qué herramienta permite auditar periódicamente la configuración de los recursos de AWS frente a reglas de cumplimiento y registrar los cambios históricos de configuración a lo largo del tiempo?",
    options: [
      "AWS Config",
      "AWS CloudWatch",
      "AWS CloudFormation",
      "Amazon Inspector"
    ],
    correctIndex: 0,
    explanation: "AWS Config evalúa, audita y monitoriza continuamente las configuraciones de los recursos de AWS, alertando si un recurso (como un bucket de S3 o un Security Group) deja de cumplir con las reglas corporativas definidas.",
    examTip: "Auditoría de cambios de configuración y conformidad de recursos = AWS Config."
  },
  {
    id: "q-31",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "Una aplicación para usuarios móviles necesita permitir que los usuarios se registren con su correo o mediante proveedores de identidad social (como Google, Apple o Facebook). ¿Qué servicio de AWS gestiona este directorio de usuarios?",
    options: [
      "Amazon Cognito (User Pools)",
      "AWS IAM",
      "AWS Secrets Manager",
      "Amazon GuardDuty"
    ],
    correctIndex: 0,
    explanation: "Amazon Cognito User Pools proporciona un directorio de usuarios seguro que escala a millones de usuarios finales para aplicaciones móviles y web, con soporte para inicio de sesión social y autenticación multifactor.",
    examTip: "Usuarios de apps web/móviles para clientes = Amazon Cognito. Empleados administrando recursos de AWS = AWS IAM."
  },
  {
    id: "q-32",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "¿Qué servicio de seguridad agrega alertas y hallazgos de seguridad de servicios como GuardDuty, Inspector, Macie y Firewall Manager en un único panel centralizado de cumplimiento?",
    options: [
      "AWS Security Hub",
      "Amazon CloudWatch Dashboard",
      "AWS Control Tower",
      "AWS Systems Manager"
    ],
    correctIndex: 0,
    explanation: "AWS Security Hub ofrece una visión integral de la postura de seguridad en AWS y ayuda a comprobar el entorno frente a estándares del sector como CIS AWS Foundations Benchmark y PCI DSS.",
    examTip: "Panel unificado que agrega todos los hallazgos de seguridad = AWS Security Hub."
  },
  {
    id: "q-33",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "¿Qué protocolo de cifrado se utiliza para proteger los datos mientras viajan por internet entre los navegadores de los usuarios y los balanceadores de carga de AWS (cifrado en tránsito)?",
    options: [
      "TLS / SSL (HTTPS)",
      "AES-256 en reposo",
      "BGP dinámico",
      "FTP sin cifrar"
    ],
    correctIndex: 0,
    explanation: "El cifrado en tránsito (Encryption in Transit) protege los datos durante la transmisión a través de la red utilizando certificados SSL/TLS emitidos y administrados por AWS Certificate Manager (ACM).",
    examTip: "Datos en tránsito = TLS/HTTPS con ACM. Datos en reposo = Cifrado con claves de AWS KMS."
  },
  {
    id: "q-34",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "Para cumplir con el principio de menor privilegio, ¿qué política de contraseña predeterminada debe configurar un administrador en AWS IAM?",
    options: [
      "Exigir una longitud mínima, inclusión de caracteres especiales, caducidad periódica y activación de MFA.",
      "Permitir contraseñas de solo 4 números sin caducidad.",
      "Compartir una única contraseña para todos los desarrolladores.",
      "Desactivar la necesidad de contraseña cuando se accede desde casa."
    ],
    correctIndex: 0,
    explanation: "La política de contraseñas de cuenta en IAM permite exigir longitud mínima, requisitos de complejidad (mayúsculas, números, símbolos) y evitar la reutilización de contraseñas anteriores.",
    examTip: "La seguridad sólida de IAM combina políticas de contraseña robustas + MFA obligatorio."
  },
  {
    id: "q-35",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "¿Cuál es la función principal de AWS Certificate Manager (ACM)?",
    options: [
      "Aprovisionar, gestionar e implementar gratuitamente certificados públicos SSL/TLS para servicios como CloudFront y Elastic Load Balancing.",
      "Emitir certificados de diplomas oficiales de AWS para ingenieros de software.",
      "Gestionar contraseñas de usuarios en bases de datos MySQL.",
      "Reemplazar el hardware de red en los centros de datos."
    ],
    correctIndex: 0,
    explanation: "AWS Certificate Manager simplifica la creación, almacenamiento y renovación automática de certificados SSL/TLS para sitios web y APIs alojadas en AWS.",
    examTip: "Certificados SSL/TLS gratuitos y autorenovables para HTTPS = AWS Certificate Manager (ACM)."
  },
  {
    id: "q-36",
    domainId: 2,
    domainName: "Dominio 2: Seguridad & IAM (30%)",
    question: "¿Qué función de seguridad a nivel de red permite crear reglas para filtrar el tráfico en función de direcciones IP de origen, rangos CIDR y números de puerto de entrada y salida a nivel de subred?",
    options: [
      "Network Access Control Lists (NACLs)",
      "Security Groups con estado",
      "Internet Gateway exclusivo",
      "AWS Direct Connect"
    ],
    correctIndex: 0,
    explanation: "Las Network ACLs actúan como un cortafuegos a nivel de subred para controlar el tráfico entrante y saliente, procesando reglas numeradas en orden secuencial.",
    examTip: "Reglas numeradas que evalúan orden ascendente y pueden denegar explícitamente IPs = Network ACLs."
  },

  // =========================================================================
  // DOMINIO 3: TECNOLOGÍA & SERVICIOS CORE DE AWS (34%) - 22 Preguntas
  // =========================================================================
  {
    id: "q-37",
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
    id: "q-38",
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
    id: "q-39",
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
    id: "q-40",
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
    id: "q-41",
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
  {
    id: "q-42",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "¿Qué motor de computación serverless para contenedores permite ejecutar contenedores Docker en Amazon ECS o Amazon EKS sin necesidad de aprovisionar ni gestionar servidores virtuales EC2 subyacentes?",
    options: [
      "AWS Fargate",
      "Amazon EC2 Dedicated",
      "AWS Elastic Beanstalk",
      "AWS Lightsail"
    ],
    correctIndex: 0,
    explanation: "AWS Fargate es la tecnología serverless de AWS que ejecuta contenedores Docker directamente. El usuario define los recursos de CPU y memoria requeridos por el contenedor y Fargate se encarga de todo el cómputo sin servidores.",
    examTip: "Contenedores Docker Serverless (sin gestionar máquinas EC2) = AWS Fargate."
  },
  {
    id: "q-43",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "Un equipo de desarrollo desea desplegar y versionar toda su infraestructura cloud (servidores, redes, bases de datos) mediante plantillas declarativas en formato YAML o JSON. ¿Qué servicio de 'Infraestructura como Código' (IaC) de AWS deben usar?",
    options: [
      "AWS CloudFormation",
      "AWS CodeDeploy",
      "AWS OpsWorks",
      "AWS Systems Manager"
    ],
    correctIndex: 0,
    explanation: "AWS CloudFormation permite modelar, aprovisionar y gestionar una colección de recursos de AWS de forma ordenada, automatizada y predecible mediante plantillas de texto declarativas en JSON o YAML.",
    examTip: "Infraestructura como Código (IaC) con plantillas JSON/YAML = AWS CloudFormation."
  },
  {
    id: "q-44",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "¿Qué servicio de almacenamiento de archivos de red totalmente elástico y compartido permite que cientos de instancias EC2 se conecten y lean/escriban simultáneamente utilizando el protocolo estándar NFS (POSIX)?",
    options: [
      "Amazon EFS (Elastic File System)",
      "Amazon EBS (Elastic Block Store)",
      "Amazon S3 Glacier",
      "AWS Storage Gateway"
    ],
    correctIndex: 0,
    explanation: "Amazon EFS es un sistema de archivos elástico y sin servidor que se monta automáticamente en múltiples instancias EC2 a la vez a través de varias Zonas de Disponibilidad.",
    examTip: "Muchas instancias EC2 compartiendo el mismo sistema de archivos por NFS = Amazon EFS."
  },
  {
    id: "q-45",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "Dos microservicios necesitan comunicarse entre sí. Si el microservicio receptor se apaga temporalmente, los mensajes no deben perderse y deben procesarse en orden cuando vuelva a encenderse. ¿Qué servicio de colas desacopla estos componentes?",
    options: [
      "Amazon SQS (Simple Queue Service)",
      "Amazon SNS (Simple Notification Service)",
      "Amazon Kinesis Video",
      "AWS Step Functions"
    ],
    correctIndex: 0,
    explanation: "Amazon SQS es un servicio de colas de mensajes totalmente gestionado que permite desacoplar componentes y microservicios. Los mensajes se retienen de forma segura en la cola hasta que el receptor los procesa.",
    examTip: "Desacoplar componentes con colas de mensajes (pull) = Amazon SQS. Envío de notificaciones push / fanout = Amazon SNS."
  },
  {
    id: "q-46",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "¿Qué servicio de mensajería 'Pub/Sub' (Publicador/Suscriptor) permite enviar notificaciones inmediatas a millones de suscriptores a través de correo electrónico, SMS, notificaciones push para móviles y funciones Lambda?",
    options: [
      "Amazon SNS (Simple Notification Service)",
      "Amazon SQS",
      "Amazon SES",
      "Amazon Connect"
    ],
    correctIndex: 0,
    explanation: "Amazon SNS es un servicio de publicación y suscripción de mensajería altamente disponible que permite la entrega masiva de mensajes 'push' a múltiples destinos a partir de una única publicación (patrón Fanout).",
    examTip: "Pub/Sub + Notificaciones push masivas / SMS / emails = Amazon SNS."
  },
  {
    id: "q-47",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "¿Qué servicio DNS y de registro de nombres de dominio altamente escalable de AWS ofrece políticas de enrutamiento avanzadas basadas en latencia, geolocalización y conmutación por error ante caídas (failover)?",
    options: [
      "Amazon Route 53",
      "AWS Direct Connect",
      "Amazon VPC Router",
      "AWS Global Accelerator"
    ],
    correctIndex: 0,
    explanation: "Amazon Route 53 es el servicio web de DNS en la nube de AWS con un SLA de disponibilidad del 100% que traduce nombres de dominio legibles en direcciones IP y enruta tráfico hacia recursos sanos.",
    examTip: "Servicio DNS global de AWS = Amazon Route 53 (puerto 53 tradicional de DNS)."
  },
  {
    id: "q-48",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "Una empresa necesita establecer una conexión de red privada de fibra óptica de alto ancho de banda y latencia ultra baja y constante entre su sede física y su VPC en AWS, sin que el tráfico pase por la internet pública. ¿Qué servicio debe contratar?",
    options: [
      "AWS Direct Connect",
      "AWS Site-to-Site VPN",
      "Internet Gateway",
      "Amazon CloudFront"
    ],
    correctIndex: 0,
    explanation: "AWS Direct Connect establece una conexión de red dedicada directa entre las instalaciones locales del cliente y AWS, omitiendo por completo los proveedores de servicios de internet públicos para garantizar máxima seguridad y velocidad.",
    examTip: "Conexión de fibra privada dedicada sin internet = AWS Direct Connect. Túnel cifrado sobre internet pública = AWS Site-to-Site VPN."
  },
  {
    id: "q-49",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "¿Qué componente de Amazon VPC permite que las instancias alojadas en una subred pública se comuniquen directamente con internet y que los usuarios de internet accedan a ellas?",
    options: [
      "Internet Gateway (IGW)",
      "NAT Gateway",
      "Virtual Private Gateway",
      "Transit Gateway"
    ],
    correctIndex: 0,
    explanation: "Un Internet Gateway (IGW) es el componente de VPC escalable y redundante que permite la comunicación bidireccional entre las instancias con IP pública de una subred pública e internet.",
    examTip: "Tráfico bidireccional a internet para subred pública = Internet Gateway. Salida solo unidireccional para subred privada sin aceptar conexiones entrantes = NAT Gateway."
  },
  {
    id: "q-50",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "Las instancias de una base de datos están ubicadas en una subred PRIVADA sin IP pública. Necesitan salir a internet únicamente para descargar parches de software pero NUNCA deben aceptar conexiones entrantes desde internet. ¿Qué componente permite esto?",
    options: [
      "NAT Gateway",
      "Internet Gateway",
      "VPC Peering",
      "Egress-Only Internet Gateway exclusivamente para IPv4"
    ],
    correctIndex: 0,
    explanation: "Un NAT Gateway (Network Address Translation) permite que las instancias de una subred privada se conecten a internet para descargar actualizaciones o APIs externas, impidiendo al mismo tiempo que servidores externos de internet inicien conexiones hacia ellas.",
    examTip: "Subred privada descargando actualizaciones a internet = NAT Gateway."
  },
  {
    id: "q-51",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "¿Qué servicio de bases de datos relacionales compatible con MySQL y PostgreSQL fue diseñado específicamente por AWS para ofrecer hasta 5 veces el rendimiento de MySQL estándar con alta disponibilidad nativa en 3 Zonas de Disponibilidad?",
    options: [
      "Amazon Aurora",
      "Amazon DynamoDB",
      "Amazon Redshift",
      "Amazon OpenSearch"
    ],
    correctIndex: 0,
    explanation: "Amazon Aurora es el motor de base de datos relacional de nivel empresarial desarrollado por AWS para la nube que replica 6 copias de los datos a través de 3 Zonas de Disponibilidad de forma automática y con autoreparación de almacenamiento.",
    examTip: "Base de datos relacional nativa de AWS con máximo rendimiento y 6 copias en 3 AZs = Amazon Aurora."
  },
  {
    id: "q-52",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "¿Qué servicio de caché en memoria de alto rendimiento acelera las lecturas de bases de datos relacionales almacenando datos frecuentes en memoria RAM mediante Redis o Memcached?",
    options: [
      "Amazon ElastiCache",
      "Amazon CloudFront",
      "Amazon MemoryDB",
      "AWS DataSync"
    ],
    correctIndex: 0,
    explanation: "Amazon ElastiCache mejora drásticamente el rendimiento de las aplicaciones web al permitir recuperar información de cachés en memoria ultrarrápidas administradas (Redis o Memcached) en microsegundos.",
    examTip: "Caché en memoria RAM para bases de datos (Redis / Memcached) = Amazon ElastiCache."
  },
  {
    id: "q-53",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "¿Cuál es el servicio de almacenamiento de datos (Data Warehouse) en la nube a escala de petabytes optimizado para inteligencia de negocio (BI) y analítica con consultas SQL complejas sobre grandes volúmenes de datos?",
    options: [
      "Amazon Redshift",
      "Amazon DynamoDB",
      "Amazon RDS",
      "Amazon QuickSight"
    ],
    correctIndex: 0,
    explanation: "Amazon Redshift es un almacén de datos (Data Warehouse) totalmente administrado que utiliza almacenamiento en columnas y procesamiento paralelo masivo (MPP) para análisis de Business Intelligence de alta velocidad.",
    examTip: "Data Warehouse relacional a escala de Petabytes / BI = Amazon Redshift. Visualización de gráficos y dashboards de BI = Amazon QuickSight."
  },
  {
    id: "q-54",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "¿Qué servicio serverless permite ejecutar consultas interactivas SQL directamente sobre datos estructurados o semiestructurados (CSV, JSON, Parquet) almacenados en Amazon S3 sin necesidad de cargar los datos en una base de datos?",
    options: [
      "Amazon Athena",
      "Amazon EMR",
      "AWS Glue",
      "Amazon Kinesis"
    ],
    correctIndex: 0,
    explanation: "Amazon Athena es un servicio de consultas interactivo sin servidor que permite analizar datos directamente en Amazon S3 utilizando SQL estándar, pagando únicamente por los gigabytes escaneados en cada consulta.",
    examTip: "Consultas SQL serverless directas sobre archivos en S3 = Amazon Athena."
  },
  {
    id: "q-55",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "Un administrador de sistemas necesita conectarse de forma remota y segura a una instancia de Amazon EC2 mediante una consola interactiva en el navegador web sin abrir el puerto 22 de SSH ni asignar una IP pública a la máquina. ¿Qué herramienta de AWS Systems Manager permite esto?",
    options: [
      "Session Manager",
      "Run Command",
      "Patch Manager",
      "Parameter Store"
    ],
    correctIndex: 0,
    explanation: "Session Manager (parte de AWS Systems Manager) proporciona una administración segura de instancias basada en el navegador con un solo clic, sin necesidad de abrir puertos de entrada (como el puerto 22 de SSH), gestionar claves SSH o utilizar servidores de salto (bastion hosts).",
    examTip: "Acceso seguro a EC2 por navegador sin SSH ni puerto 22 abierto = Session Manager."
  },
  {
    id: "q-56",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "¿Cuál es la función principal de Amazon CloudWatch?",
    options: [
      "Recopilar métricas de rendimiento (CPU, memoria, disco), monitorear archivos de registro (logs) y activar alarmas automáticas.",
      "Auditar qué usuario llamó a qué API de AWS para investigaciones forenses.",
      "Aprovisionar infraestructura mediante código JSON.",
      "Comprar dominios web internacionales."
    ],
    correctIndex: 0,
    explanation: "Amazon CloudWatch es el servicio de monitorización y observabilidad que recopila métricas y registros de rendimiento de todos los recursos de AWS y permite configurar alarmas automáticas (por ejemplo, para escalar con Auto Scaling o alertar por alta CPU).",
    examTip: "CloudWatch = Métricas, alarmas de rendimiento y CPU. CloudTrail = Registro de auditoría de quién hizo llamadas a la API."
  },
  {
    id: "q-57",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "¿Qué servicio registra continuamente el historial completo de llamadas a la API de AWS (incluyendo el usuario que las realizó, la hora, la dirección IP de origen y los parámetros enviados) para gobernanza y auditoría?",
    options: [
      "AWS CloudTrail",
      "Amazon CloudWatch",
      "AWS Config",
      "Amazon GuardDuty"
    ],
    correctIndex: 0,
    explanation: "AWS CloudTrail permite la gobernanza, la conformidad, la auditoría operativa y la evaluación de riesgos al registrar de forma inmutable todas las acciones realizadas a través de la consola de AWS, el SDK o la CLI.",
    examTip: "'¿Quién borró la base de datos el martes a las 3am?' -> AWS CloudTrail."
  },
  {
    id: "q-58",
    domainId: 3,
    domainName: "Dominio 3: Tecnología & Servicios (34%)",
    question: "¿Qué servicio orquesta flujos de trabajo visuales serverless coordinando múltiples funciones AWS Lambda y servicios en máquinas de estado con control de reintentos y gestión de errores?",
    options: [
      "AWS Step Functions",
      "Amazon MQ",
      "AWS Batch",
      "Amazon EventBridge"
    ],
    correctIndex: 0,
    explanation: "AWS Step Functions es un orquestador visual serverless de código bajo que permite a los desarrolladores crear flujos de trabajo distribuidos y coordinar microservicios con manejo automático de errores y tiempos de espera.",
    examTip: "Orquestación de flujos de trabajo serverless con diagramas de estado = AWS Step Functions."
  },

  // =========================================================================
  // DOMINIO 4: FACTURACIÓN, PRECIOS & SOPORTE (12%) - 7 Preguntas
  // =========================================================================
  {
    id: "q-59",
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
    id: "q-60",
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
    id: "q-61",
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
    id: "q-62",
    domainId: 4,
    domainName: "Dominio 4: Costes & Gobernanza (12%)",
    question: "¿Qué plan de soporte oficial de AWS es el MÍNIMO que incluye acceso telefónico y por chat 24/7 con ingenieros de soporte de AWS y tiempos de respuesta de menos de 1 hora para incidentes en sistemas de producción caídos?",
    options: [
      "AWS Business Support",
      "AWS Developer Support",
      "AWS Basic Support",
      "AWS Enterprise On-Ramp"
    ],
    correctIndex: 0,
    explanation: "El plan AWS Business Support ofrece soporte 24/7 por teléfono, chat y correo para un número ilimitado de contactos, con tiempos de respuesta de menos de 1 hora para fallos en producción y acceso completo a todas las comprobaciones de AWS Trusted Advisor.",
    examTip: "Developer = Horario comercial / Solo email. Business = 24/7 teléfono y chat / Producción <1h. Enterprise = Technical Account Manager (TAM) dedicado / <15 minutos."
  },
  {
    id: "q-63",
    domainId: 4,
    domainName: "Dominio 4: Costes & Gobernanza (12%)",
    question: "¿Qué plan de soporte de AWS proporciona acceso exclusivo a un Technical Account Manager (TAM) designado como punto de contacto técnico dedicado para ayudar a planificar y optimizar la arquitectura de la empresa?",
    options: [
      "AWS Enterprise Support",
      "AWS Business Support",
      "AWS Developer Support",
      "AWS Free Tier Support"
    ],
    correctIndex: 0,
    explanation: "AWS Enterprise Support incluye un Technical Account Manager (TAM) dedicado que proporciona orientación proactiva, revisiones de arquitectura Well-Architected y gestión directa de soporte para incidentes críticos de negocio en menos de 15 minutos.",
    examTip: "Technical Account Manager (TAM) designado = AWS Enterprise Support."
  },
  {
    id: "q-64",
    domainId: 4,
    domainName: "Dominio 4: Costes & Gobernanza (12%)",
    question: "¿Qué catálogo digital permite a las organizaciones buscar, comprar, desplegar y gestionar aplicaciones, imágenes AMI y soluciones SaaS de proveedores de software independientes (ISV) con cargos facturados directamente en su factura mensual de AWS?",
    options: [
      "AWS Marketplace",
      "AWS Service Catalog",
      "AWS OpsWorks Store",
      "AWS AppConfig"
    ],
    correctIndex: 0,
    explanation: "AWS Marketplace es una tienda digital seleccionada donde los clientes pueden encontrar y suscribirse a miles de soluciones de software de terceros (seguridad, redes, almacenamiento, bases de datos) con integración directa en la factura unificada de AWS.",
    examTip: "Tienda digital para software de terceros facturado en AWS = AWS Marketplace."
  },
  {
    id: "q-65",
    domainId: 4,
    domainName: "Dominio 4: Costes & Gobernanza (12%)",
    question: "¿Cuál es la política general de tarificación de AWS con respecto a la transferencia de datos (Data Transfer)?",
    options: [
      "La transferencia de datos entrante (Inbound) hacia AWS desde internet es gratuita; la transferencia saliente (Outbound) hacia internet se factura por gigabyte.",
      "Toda la transferencia de datos tanto de entrada como de salida es siempre completamente gratuita.",
      "La entrada de datos cuesta el doble que la salida.",
      "La transferencia entre diferentes Regiones es gratuita."
    ],
    correctIndex: 0,
    explanation: "En la política de costes de red de AWS: el tráfico de entrada (Inbound data transfer) procedente de internet hacia AWS es siempre gratuito (0€/GB). La transferencia de datos que sale de la nube de AWS hacia internet (Outbound data transfer) se factura de acuerdo al volumen consumido.",
    examTip: "Regla fija: Tráfico de entrada desde internet = GRATIS. Tráfico de salida hacia internet = Se paga por GB."
  }
];
