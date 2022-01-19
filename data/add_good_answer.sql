BEGIN;

ALTER TABLE "answer"
    ADD COLUMN "is_good_answer" boolean NOT NULL DEFAULT false;

COMMIT;