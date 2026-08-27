-- CreateTable
CREATE TABLE "accrual_runs" (
    "id" UUID NOT NULL,
    "period" TEXT NOT NULL,
    "ran_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accrual_runs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accrual_runs_period_key" ON "accrual_runs"("period");
