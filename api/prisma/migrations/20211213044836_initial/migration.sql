-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nodes" (
    "id" UUID NOT NULL,
    "ip" VARCHAR(255) NOT NULL,
    "total_memory" INTEGER NOT NULL,
    "free_memory" INTEGER NOT NULL,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servers" (
    "id" UUID NOT NULL,
    "port" INTEGER NOT NULL,
    "memory" INTEGER NOT NULL,
    "cpu_percent" VARCHAR(255),
    "memory_percent" VARCHAR(255),
    "restart" BOOLEAN NOT NULL DEFAULT false,
    "running" BOOLEAN NOT NULL DEFAULT true,
    "run_backup" BOOLEAN NOT NULL DEFAULT false,
    "node_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "servers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "servers" ADD CONSTRAINT "servers_node_id_fkey" FOREIGN KEY ("node_id") REFERENCES "nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "servers" ADD CONSTRAINT "servers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
