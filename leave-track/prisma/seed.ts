import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed leave_types
  const leaveTypes = await Promise.all([
    prisma.leaveType.upsert({
      where: { id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' },
      update: {},
      create: {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        name: 'Vacation',
        tracksBalance: true,
      },
    }),
    prisma.leaveType.upsert({
      where: { id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12' },
      update: {},
      create: {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
        name: 'Sick',
        tracksBalance: true,
      },
    }),
    prisma.leaveType.upsert({
      where: { id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13' },
      update: {},
      create: {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
        name: 'Unpaid',
        tracksBalance: false,
      },
    }),
  ]);

  console.log('Seeded leave_types:', leaveTypes.map(lt => lt.name).join(', '));

  // Create mock users
  const hrAdmin = await prisma.user.upsert({
    where: { email: 'hr@leavetrack.com' },
    update: {},
    create: {
      name: 'HR Admin',
      email: 'hr@leavetrack.com',
      role: 'hr_admin',
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@leavetrack.com' },
    update: {},
    create: {
      name: 'Team Manager',
      email: 'manager@leavetrack.com',
      role: 'manager',
      managerId: hrAdmin.id,
    },
  });

  const employee = await prisma.user.upsert({
    where: { email: 'employee@leavetrack.com' },
    update: {},
    create: {
      name: 'John Employee',
      email: 'employee@leavetrack.com',
      role: 'employee',
      managerId: manager.id,
    },
  });

  console.log('Seeded users:', hrAdmin.name, manager.name, employee.name);

  // Create mock leave policies
  const vacationType = leaveTypes.find(lt => lt.name === 'Vacation')!;
  const sickType = leaveTypes.find(lt => lt.name === 'Sick')!;

  await prisma.leavePolicy.upsert({
    where: {
      userId_leaveTypeId: {
        userId: employee.id,
        leaveTypeId: vacationType.id,
      },
    },
    update: {},
    create: {
      userId: employee.id,
      leaveTypeId: vacationType.id,
      accrualPerMonth: 1.5,
    },
  });

  await prisma.leavePolicy.upsert({
    where: {
      userId_leaveTypeId: {
        userId: employee.id,
        leaveTypeId: sickType.id,
      },
    },
    update: {},
    create: {
      userId: employee.id,
      leaveTypeId: sickType.id,
      accrualPerMonth: 1.0,
    },
  });

  // Create mock leave balances
  await prisma.leaveBalance.upsert({
    where: {
      userId_leaveTypeId: {
        userId: employee.id,
        leaveTypeId: vacationType.id,
      },
    },
    update: { balance: 12.5 },
    create: {
      userId: employee.id,
      leaveTypeId: vacationType.id,
      balance: 12.5,
    },
  });

  await prisma.leaveBalance.upsert({
    where: {
      userId_leaveTypeId: {
        userId: employee.id,
        leaveTypeId: sickType.id,
      },
    },
    update: { balance: 8.0 },
    create: {
      userId: employee.id,
      leaveTypeId: sickType.id,
      balance: 8.0,
    },
  });

  console.log('Seeded leave policies and balances');

  // Create mock leave requests
  const pendingRequest = await prisma.leaveRequest.create({
    data: {
      userId: employee.id,
      leaveTypeId: vacationType.id,
      startDate: new Date('2026-09-15'),
      endDate: new Date('2026-09-19'),
      reason: 'Family vacation',
      status: 'pending',
    },
  });

  const approvedRequest = await prisma.leaveRequest.create({
    data: {
      userId: employee.id,
      leaveTypeId: sickType.id,
      startDate: new Date('2026-08-01'),
      endDate: new Date('2026-08-02'),
      reason: 'Feeling unwell',
      status: 'approved',
      decidedBy: manager.id,
      decidedAt: new Date('2026-08-01'),
    },
  });

  console.log('Seeded leave requests');

  // Create audit logs
  await prisma.auditLog.create({
    data: {
      leaveRequestId: approvedRequest.id,
      actorId: manager.id,
      action: 'approved',
      occurredAt: new Date('2026-08-01'),
    },
  });

  console.log('Seeded audit logs');
  console.log('Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
