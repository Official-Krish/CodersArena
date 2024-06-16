-- CreateTable
CREATE TABLE "languages" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "compile_cmd" VARCHAR,
    "run_cmd" VARCHAR,
    "source_file" VARCHAR,
    "is_archived" BOOLEAN DEFAULT false,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);
