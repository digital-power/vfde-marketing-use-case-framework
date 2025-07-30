interface ExpectedRoleProps {
  roles: string[]
}

export function ExpectedRole({ roles }: ExpectedRoleProps) {
  return (
    <div style={{ 
      marginTop: '15px', 
      padding: '12px', 
      backgroundColor: '#dcfce7', 
      borderRadius: '6px', 
      border: '1px solid #e0f2fe',
      marginBottom: '15px' 
    }}>
      <p style={{ margin: '0', fontSize: '12px', color: '#1f2937', fontWeight: '500' }}>
        <strong>Expected roles for this phase:</strong>
      </p>
      <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#1f2937' }}>
        {roles.map((role, index) => (
          <span key={index}>
            • {role} {index < roles.length - 1 && <br />}
          </span>
        ))}
      </p>
    </div>
  )
}